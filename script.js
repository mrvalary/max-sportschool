(() => {
const sports=[
{name:'Плавание',icon:'🏊',cities:['Хабаровск','Комсомольск-на-Амуре'],groups:21},
{name:'Адаптивная верховая езда',icon:'🐎',cities:['Хабаровск'],groups:3,note:'с элементами иппотерапии'},
{name:'Футбол с заболеванием ЦП',icon:'⚽',cities:['Хабаровск'],groups:1},
{name:'Футбол ЛИН',icon:'⚽',cities:['Хабаровск'],groups:1},
{name:'Футзал',icon:'🥅',cities:['Хабаровск'],groups:1},
{name:'Ритмика',icon:'🎵',cities:['Хабаровск'],groups:1},
{name:'Дзюдо',icon:'🥋',cities:['Хабаровск'],groups:2},
{name:'Самбо',icon:'🥋',cities:['Хабаровск'],groups:1},
{name:'Хоккей',icon:'🏒',cities:['Хабаровск'],groups:1},
{name:'Волейбол',icon:'🏐',cities:['Хабаровск'],groups:1},
{name:'ОФП',icon:'💪',cities:['Хабаровск'],groups:1},
{name:'Настольный теннис',icon:'🏓',cities:['Хабаровск','Комсомольск-на-Амуре'],groups:3},
{name:'Пауэрлифтинг',icon:'🏋️',cities:['Бикин'],groups:2},
{name:'Дартс',icon:'🎯',cities:['Комсомольск-на-Амуре'],groups:1}
];
const faqs=[
['Где находится организация?','г. Хабаровск, ул. Муравьёва-Амурского, 4.'],
['Кто может заниматься адаптивным спортом?','В физкультурно-оздоровительных группах занимаются инвалиды и лица с ограниченными возможностями здоровья. Подробные условия по выбранному направлению лучше уточнить у специалистов школы.'],
['Какие спортивные направления доступны?','На официальной странице Ресурсного центра указаны 14 дисциплин в 40 группах: от плавания и единоборств до настольного тенниса, пауэрлифтинга и дартса.'],
['Как узнать расписание занятий?','Расписание зависит от дисциплины и места проведения. Для актуального расписания свяжитесь с администрацией или Ресурсным центром.'],
['Как записаться на занятия?','Свяжитесь с администрацией по телефону или оставьте обращение через форму. Специалисты подскажут порядок дальнейших действий.'],
['Какие документы нужны для зачисления?','Перечень документов зависит от программы и этапа подготовки. Перед подачей документов лучше уточнить актуальные требования у администрации школы.'],
['Платные или бесплатные занятия?','Условия по конкретной программе лучше уточнить у администрации, поскольку они могут отличаться.'],
['Как связаться с администрацией?','Основной телефон: +7 (4212) 37-34-04. Ресурсный центр: +7 (999) 080-48-52. E-mail: 4212304960@mail.ru.']
];
function showScreen(id){const target=document.getElementById(id);if(!target)return;document.querySelectorAll('.screen').forEach(el=>el.classList.remove('active'));target.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
function groupWord(n){const a=n%10,b=n%100;return a===1&&b!==11?'группа':a>=2&&a<=4&&(b<12||b>14)?'группы':'групп';}
const sportRoot=document.getElementById('sports-list');if(sportRoot){sports.forEach(s=>{const card=document.createElement('article');card.className='sport-card';const note=s.note?'<span class="pill">ℹ️ '+s.note+'</span>':'';card.innerHTML='<div class="sport-card__icon">'+s.icon+'</div><div><h3>'+s.name+'</h3><div class="sport-meta">'+s.cities.map(c=>'<span class="pill">📍 '+c+'</span>').join('')+'<span class="pill pill--groups">'+s.groups+' '+groupWord(s.groups)+'</span>'+note+'</div></div>';sportRoot.appendChild(card);});}
const faqRoot=document.getElementById('faq-list');if(faqRoot){faqs.forEach(([q,a],i)=>{const item=document.createElement('article');item.className='faq-item';item.innerHTML='<button class="faq-q" type="button" aria-expanded="false"><span><span class="faq-index">'+String(i+1).padStart(2,'0')+'</span>'+q+'</span><span class="faq-chevron">⌄</span></button><div class="faq-a">'+a+'</div>';faqRoot.appendChild(item);});}
document.addEventListener('click',e=>{const nav=e.target.closest('[data-target]');if(nav){showScreen(nav.dataset.target);return;}const toggle=e.target.closest('.faq-q');if(toggle){const item=toggle.closest('.faq-item');const wasOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(el=>{el.classList.remove('open');el.querySelector('.faq-q')?.setAttribute('aria-expanded','false');});if(!wasOpen){item.classList.add('open');toggle.setAttribute('aria-expanded','true');}}});

const appealButton=document.getElementById('appeal-open-button');
if(appealButton){
  appealButton.addEventListener('click',(event)=>{
    if(typeof window.WebApp?.openLink === 'function'){
      event.preventDefault();
      window.WebApp.openLink(appealButton.href);
    }
    // Outside MAX, the standard anchor opens the form in a new tab.
  });
}
window.showScreen=showScreen;
})();