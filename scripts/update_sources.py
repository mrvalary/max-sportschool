"""Fetch public school sources; preserve the last validated copy on failure."""
import argparse
import concurrent.futures
import copy
import datetime as dt
import hashlib
import html as escape_html
import io
import zipfile
import json
import re
import time
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

from lxml import html, etree
import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'

def stamp():
    return dt.datetime.now(dt.timezone.utc).isoformat()

def clean(s):
    return re.sub(r'\s+', ' ', s or '').strip()

def get(url):
    if urlparse(url).hostname != 'kski.ru' or not url.startswith('https://'):
        raise ValueError('Unsupported source host')
    req = urllib.request.Request(url, headers={'User-Agent': 'School-public-information-sync/1.0'})
    with urllib.request.urlopen(req, timeout=25) as response:
        if urlparse(response.url).hostname != 'kski.ru':
            raise ValueError('Source redirected outside school website')
        data = response.read(12_000_001)
    if len(data) > 12_000_000:
        raise ValueError('Source is too large')
    return data

def parse_page(key, url, body):
    doc = html.fromstring(body)
    blocks = doc.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," container-fluid ") and contains(concat(" ",normalize-space(@class)," ")," py-3 ")]')
    if not blocks:
        raise ValueError('Source layout changed: content block missing')
    block = blocks[0]
    for el in block.xpath('.//script|.//style|.//iframe|.//form'):
        el.drop_tree()
    tables = []
    allowed = {'table','thead','tbody','tfoot','tr','td','th','br','p','strong','b','span'}
    for original in block.xpath('.//table'):
        table = copy.deepcopy(original)
        # Keep only table markup and safe numeric cell spans.
        for el in list(table.iter()):
            for name in list(el.attrib):
                if name not in ('rowspan','colspan') or not re.fullmatch(r'[1-9][0-9]?', el.attrib[name]):
                    del el.attrib[name]
            if isinstance(el.tag, str) and el.tag.lower() not in allowed:
                el.drop_tag()
        tables.append(etree.tostring(table, encoding='unicode', method='html'))
    files, images = {}, {}
    for a in block.xpath('.//a[@href]'):
        target = urljoin(url, a.get('href'))
        if urlparse(target).hostname != 'kski.ru' or not re.search(r'\.(pdf|docx?|xlsx?)(?:\?|$)', target, re.I):
            continue
        parent = a.getparent()
        title = clean(parent.text_content() if parent is not None else a.text_content())
        title = re.sub(r'\(?скачать.*$', '', title, flags=re.I).strip()
        if len(title) < 5 or len(title) > 350:
            title = unquote(urlparse(target).path.rsplit('/',1)[-1])
        files[target] = {'title':title,'url':target,'source':url,'format':urlparse(target).path.rsplit('.',1)[-1].upper(),'local':None}
    for image in block.xpath('.//img[@src]'):
        target = urljoin(url,image.get('src'))
        if urlparse(target).hostname == 'kski.ru':
            images[target] = {'src':target,'alt':image.get('alt',''),'local':None}
    if key in ('resourceSchedule','mustangSchedule','gtoCalendar') and not tables:
        raise ValueError('Expected schedule table is missing')
    if key == 'sportSchedule' and not any(x['format']=='PDF' for x in files.values()):
        raise ValueError('Expected schedule PDF is missing')
    if key == 'veteransSchedule' and not images and not files:
        raise ValueError('Expected schedule images/documents are missing')
    return {'key':key,'url':url,'tables':tables,'images':list(images.values()),'files':list(files.values()),'text':clean(block.text_content()),'fetchedAt':stamp(),'live':True}

def extract_schedule(body, source):
    """Resolve PDF merged cells by geometry, and join explicit page continuations."""
    records = []
    city = category = ''
    context = ['', '', '', '', '', '', '']
    with pdfplumber.open(io.BytesIO(body)) as pdf:
        for number, page in enumerate(pdf.pages,1):
            tables = page.find_tables()
            if not tables:
                raise ValueError(f'No text table on PDF page {number}; previous table preserved')
            table = max(tables,key=lambda t:t.bbox[2]-t.bbox[0])
            # The source has seven logical columns; PDF grid detection sometimes
            # inserts extra narrow columns where adjacent pages do not align.
            left,right = table.bbox[0],table.bbox[2]
            ratios = [0,.11705,.25222,.35014,.43057,.52554,.71053,1]
            xs = [left+(right-left)*x for x in ratios]
            seen = set()
            cache = {}
            def cell_text(cell):
                if cell not in cache:
                    def inside(obj):
                        return obj.get('object_type')!='char' or (cell[0] <= (obj['x0']+obj['x1'])/2 <= cell[2] and cell[1] <= (obj['top']+obj['bottom'])/2 <= cell[3])
                    cache[cell] = clean(page.filter(inside).crop(cell).extract_text(x_tolerance=2,y_tolerance=3))
                return cache[cell]
            def owner(x,y):
                cells = [c for c in table.cells if c[0]-.2<=x<=c[2]+.2 and c[1]-.2<=y<=c[3]+.2]
                return min(cells,key=lambda c:(c[2]-c[0])*(c[3]-c[1])) if cells else None
            row_tops=sorted(set(round(row.bbox[1],3) for row in table.rows))
            for row_index,top in enumerate(row_tops):
                bottom=row_tops[row_index+1] if row_index+1<len(row_tops) else table.bbox[3]
                if bottom-top<1: continue
                y=(top+bottom)/2
                owners=[owner((xs[i]+xs[i+1])/2,y) for i in range(7)]
                cells=[cell_text(c) if c else '' for c in owners]
                text = cells[0]
                if owners[0] and owners[0][2]-owners[0][0] > (right-left)*.9:
                    if re.search(r'спорт|нарушен|поражен',text,re.I):
                        category=text
                    elif text and not re.search(r'дисциплин|ФИО',text):
                        city=text
                    continue
                if 'дисциплина' in text or 'тренера' in cells[1] or 'до 18 лет' in cells[3]:
                    continue
                stage=cells[2]
                if not re.fullmatch(r'(?:СОГ|ФОГ|ГНП|НП|УТГ|УТ|ССМ|ВСМ)[\w/\-– ]*',stage):
                    # A continuation has empty identity/stage fields, not a new group.
                    if records and not stage and not cells[1] and (cells[5] or cells[6]):
                        prev=records[-1]
                        for idx,key in [(5,'time'),(6,'venue')]:
                            if cells[idx] and cells[idx] not in prev[key]:
                                prev[key]=clean(prev[key]+' '+cells[idx]);context[idx]=prev[key]
                        if number not in prev['pages']: prev['pages'].append(number)
                    continue
                identity=(owners[1],owners[2],owners[5],owners[6])
                if identity in seen: continue
                seen.add(identity)
                for i in (0,1,6):
                    if cells[i]: context[i]=cells[i]
                    else: cells[i]=context[i]
                if not cells[5] and owners[5] is None:
                    raise ValueError(f'Schedule cell missing on page {number}')
                if not cells[0] or not cells[1] or not cells[5]:
                    raise ValueError(f'Incomplete schedule row on page {number}')
                records.append({'sport':cells[0],'trainer':cells[1],'stage':stage,'time':cells[5],'venue':cells[6],'city':city,'category':category,'pages':[number]})
    if len(records)<20:
        raise ValueError('PDF extraction produced too few rows')
    return {'rows':records,'source':source,'sourceHash':hashlib.sha256(body).hexdigest(),'extractedAt':stamp(),'pages':len(pdf.pages)}

def schedule_file(feed):
    choices=[f for f in feed['files'] if f.get('format')=='PDF' and 'расписан' in (f['title']+unquote(f['url'])).lower()]
    if not choices: raise ValueError('No schedule PDF link found')
    def rank(item):
        path=unquote(item['url']); years=[int(y) for y in re.findall(r'20\d{2}',path+' '+item['title'])]
        dates=re.findall(r'/([0-9]{4}/[0-9]{2}/[0-9]{2})/',path)
        return (max(years or [0]),max(dates or ['']),path)
    return max(choices,key=rank)


def extract_veterans_schedule(body, source):
    """Read DOCX text runs and explicit Word cell merges without OCR."""
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    attr = '{'+ns['w']+'}'
    with zipfile.ZipFile(io.BytesIO(body)) as archive:
        member = archive.getinfo('word/document.xml')
        if member.file_size > 12_000_000:
            raise ValueError('DOCX XML is too large')
        root = etree.fromstring(archive.read(member), etree.XMLParser(resolve_entities=False, no_network=True))
    def text(el):
        return clean(' '.join(''.join(p.xpath('.//w:t/text()', namespaces=ns)) for p in ([el] if el.tag == attr+'p' else el.xpath('.//w:p', namespaces=ns))))
    rows, city = [], ''
    for node in root.find('w:body', ns):
        if node.tag == attr+'p':
            value = text(node)
            if re.match(r'^(?:г\.|р\s*\.\s*п\s*\.)', value):
                city = re.sub(r'^(?:г\.|р\s*\.\s*п\s*\.)\s*', '', value)
                city = re.sub(r'\s*[–—-]\s*', '-', city)
            continue
        if node.tag != attr+'tbl': continue
        inherited = {}
        weekdays_checked = False
        for tr in node.findall('w:tr', ns):
            cells, col = [], 0
            for cell in tr.findall('w:tc', ns):
                props = cell.find('w:tcPr', ns)
                span = props.find('w:gridSpan', ns) if props is not None else None
                width = int(span.get(attr+'val', '1')) if span is not None else 1
                merge = props.find('w:vMerge', ns) if props is not None else None
                value = text(cell)
                if merge is not None and merge.get(attr+'val') != 'restart':
                    value = inherited.get(col, '')
                for _ in range(width):
                    cells.append(value)
                    if merge is not None: inherited[col] = value
                    else: inherited.pop(col, None)
                    col += 1
            if len(cells) == 11:
                day_headers = [re.sub(r'[\s-]', '', t).lower() for t in cells[4:]]
                if day_headers[0].startswith('понедель'):
                    expected = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье']
                    if day_headers != expected: raise ValueError('DOCX weekday columns changed')
                    weekdays_checked = True
            if len(cells) != 11: continue
            if not any(re.search(r'\d{1,2}[.:]\d{2}', t) for t in cells[4:]):
                if weekdays_checked and any(cells[4:]) and all(cells[i] for i in (1,2,3)):
                    raise ValueError('Unrecognized DOCX schedule times; previous table preserved')
                continue
            if not weekdays_checked: raise ValueError('DOCX weekday header missing')
            if not city or not all(cells[i] for i in (1,2,3)):
                raise ValueError('Incomplete DOCX schedule identity: '+str((city,cells)))
            times = cells[4:11]
            for value in times:
                if value and not re.search(r'\d{1,2}[.:]\d{2}\s*[-–—]\s*\d{1,2}[.:]\d{2}', value):
                    raise ValueError('Unrecognized DOCX time cell')
            rows.append({'city':city,'sport':cells[2],'trainer':cells[3], 'venue':cells[1], 'category':'Участники СВО', 'stage':'', 'times':times})
    if len(rows) < 5 or len({r['city'] for r in rows}) < 2:
        raise ValueError('DOCX schedule extraction produced incomplete data')
    return {'scheduleRows':rows,'scheduleSource':source,'scheduleSourceHash':hashlib.sha256(body).hexdigest(),'scheduleParsedAt':stamp()}

def update_veterans_schedule(feed, old):
    choices = [f for f in feed['files'] if f.get('format') == 'DOCX' and 'расписан' in (f['title']+unquote(f['url'])).lower()]
    if not choices: raise ValueError('No veterans schedule DOCX found; previous schedule preserved')
    selected = max(choices, key=lambda f: unquote(f['url']))
    body = get(selected['url'])
    digest = hashlib.sha256(body).hexdigest()
    if old and old.get('scheduleSourceHash') == digest and old.get('scheduleRows'):
        feed.update({k:old[k] for k in ('scheduleRows','scheduleSource','scheduleSourceHash','scheduleParsedAt')})
        feed['scheduleSource'] = selected['url']
    else:
        feed.update(extract_veterans_schedule(body, selected['url']))

def save(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(obj,ensure_ascii=False,separators=(',',':')),encoding='utf8')

def update_one(key,url):
    path=DATA/'feeds'/f'{key}.json'
    old=json.loads(path.read_text()) if path.exists() else None
    try:
        feed=parse_page(key,url,get(url))
        if key == 'veteransSchedule': update_veterans_schedule(feed, old)
        feed['checkedAt']=stamp();feed['lastError']=None
        save(path,feed)
        return key,True,None
    except Exception as error:
        if old:
            old['checkedAt']=stamp();old['lastError']=str(error);save(path,old)
        return key,False,str(error)

def main():
    args=argparse.ArgumentParser();args.add_argument('--pdf');args.add_argument('--pdf-url');opts=args.parse_args()
    if opts.pdf:
        result=extract_schedule(Path(opts.pdf).read_bytes(),opts.pdf_url)
        result['snapshot']=True
        save(DATA/'sport-schedule.json',result);print('PDF rows:',len(result['rows']));return
    sources=json.loads((DATA/'sources.json').read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results=list(pool.map(lambda x:update_one(*x),sources.items()))
    for key,ok,error in results: print(key,'OK' if ok else 'PRESERVED',error or '')
    pdfpath=DATA/'sport-schedule.json'
    old=json.loads(pdfpath.read_text()) if pdfpath.exists() else None
    try:
        feed=json.loads((DATA/'feeds/sportSchedule.json').read_text())
        if feed.get('lastError'): raise ValueError('Schedule source page unavailable')
        selected=schedule_file(feed);body=get(selected['url']);digest=hashlib.sha256(body).hexdigest()
        result=old if old and old.get('sourceHash')==digest else extract_schedule(body,selected['url'])
        result.update({'checkedAt':stamp(),'lastError':None,'source':selected['url'],'fetchedAt':stamp(),'snapshot':False})
        save(pdfpath,result)
    except Exception as error:
        if old: old.update({'checkedAt':stamp(),'lastError':str(error)});save(pdfpath,old)
        print('PDF PRESERVED',str(error))
    save(DATA/'status.json',{'checkedAt':stamp(),'successful':sum(x[1] for x in results),'total':len(results)})

if __name__=='__main__':main()
