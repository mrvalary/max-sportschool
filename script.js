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
const sportDescriptions=[
  "Занятия в бассейне с упражнениями в воде. Плавание помогает развивать координацию движений, выносливость и общую физическую подготовку.",
  "Занятия с лошадьми включают элементы адаптивной верховой езды и иппотерапии. Работа с инструктором помогает тренировать равновесие, координацию и уверенность в движениях.",
  "Командные занятия футболом, адаптированные для участников с церебральным параличом. Включают упражнения с мячом, отработку игровых действий и взаимодействие в команде.",
  "Занятия футболом для спортсменов с интеллектуальными нарушениями. Программа сочетает упражнения с мячом, развитие координации и командную игру.",
  "Футзал — разновидность футбола в спортивном зале. На занятиях развивают владение мячом, скорость реакции и умение действовать вместе с командой.",
  "Ритмика сочетает движения под музыку, упражнения на координацию и чувство ритма. Нагрузка и сложность движений подбираются с учётом возможностей занимающихся.",
  "Дзюдо — спортивное единоборство с изучением техники, равновесия и безопасных способов выполнения упражнений. Занятия развивают координацию и самоконтроль.",
  "Самбо — вид спортивного единоборства, в котором изучают движения, приёмы и правила взаимодействия с партнёром. Упражнения помогают развивать силу и координацию.",
  "Хоккей — командный вид спорта с упражнениями на владение клюшкой, перемещение и взаимодействие с партнёрами. Формат тренировок определяется возможностями группы.",
  "Волейбол — командная игра с передачами мяча, упражнениями на реакцию, координацию и взаимодействие между участниками.",
  "Общая физическая подготовка включает упражнения на силу, подвижность, гибкость, равновесие и выносливость. Содержание занятий подбирается с учётом возможностей группы.",
  "Настольный теннис — игра с ракеткой и мячом, развивающая внимание, точность движений, реакцию и координацию рук и глаз.",
  "Пауэрлифтинг — силовой вид спорта. На занятиях осваивают технику силовых упражнений и работу с нагрузкой под контролем специалиста.",
  "Дартс — метание дротиков в мишень. Занятия требуют концентрации, точности и контроля движений, помогают тренировать внимание."
];

const faqs=[
['Где находится организация?','Фактический адрес школы: г. Хабаровск, ул. Муравьёва-Амурского, 4.'],
['Кто может заниматься адаптивным спортом?','В физкультурно-оздоровительных группах школы занимаются инвалиды и лица с ограниченными возможностями здоровья, включая детей-инвалидов. Подходящую дисциплину и условия участия можно уточнить у специалистов школы.'],
['Какие спортивные направления доступны?','По данным Ресурсного центра, организованы 40 физкультурно-оздоровительных групп по 14 дисциплинам в Хабаровске, Комсомольске-на-Амуре и Бикине. Перечень приведён в разделе «Спортивные направления» приложения.'],
['Как узнать расписание занятий?','На официальном сайте опубликовано <a href="https://kski.ru/content/podrazdeleniya/resource-center/raspisanie/" target="_blank" rel="noopener">расписание занятий на 2026 год</a> по дисциплинам, тренерам и спортивным объектам. Перед посещением рекомендуем уточнить актуальность у специалистов школы.'],
['Как записаться на занятия?','По вопросам зачисления на спортивную подготовку обращайтесь в отдел по спортивной подготовке: <a href="tel:+74212311477">+7 (4212) 31-14-77</a>. По физкультурно-оздоровительным группам можно обратиться в Ресурсный центр: <a href="tel:+79990804852">+7 (999) 080-48-52</a>.'],
['Какие документы нужны для зачисления?','Для спортивной подготовки на сайте указаны заявление и анкета, документы, удостоверяющие личность, полис ОМС, СНИЛС, документы МСЭ или ПМПК и медицинское заключение. Перечень зависит от возраста и программы; смотрите <a href="https://kski.ru/content/o-shkole/dokuments/dokumenty-dlya-zachisleniya/sportivnaya-podgotovka/" target="_blank" rel="noopener">официальные условия зачисления</a>.'],
['Платные или бесплатные занятия?','На сайте школы размещаются сведения о платных образовательных услугах, но условия зависят от конкретной программы. Уточните стоимость или наличие бесплатных мест у администрации: <a href="tel:+74212311477">+7 (4212) 31-14-77</a>.'],
['Как связаться с администрацией?','Отдел спортивной подготовки: <a href="tel:+74212311477">+7 (4212) 31-14-77</a>. Ресурсный центр: <a href="tel:+79990804852">+7 (999) 080-48-52</a>. E-mail школы: <a href="mailto:4212304960@mail.ru">4212304960@mail.ru</a>. Остальные контакты — в разделе «Связь с администрацией».']
];
const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
let revealObserver;
function observeReveals(root=document){
  const elements=root.querySelectorAll('.stat-card,.menu-card,.gallery-card,.sport-card,.faq-item,.contact-card,.department-card,.job-card,.section-block,.info-banner,.appeal-box');
  if(!('IntersectionObserver' in window)||reducedMotion){elements.forEach(el=>el.classList.add('revealed'));return;}
  if(!revealObserver){revealObserver=new IntersectionObserver(entries=>{
    for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target);}}
  },{threshold:0.08,rootMargin:'0px 0px 25px 0px'});}
  elements.forEach(el=>{if(!el.classList.contains('revealed')){el.classList.add('reveal-ready');revealObserver.observe(el);}});
}
function showScreen(id){
  const target=document.getElementById(id);if(!target)return;
  document.querySelectorAll('.screen').forEach(el=>el.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(button=>{
    const active=button.dataset.target===id;
    button.classList.toggle('is-active',active);
    if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
  window.scrollTo({top:0,behavior:reducedMotion?'instant':'smooth'});
  requestAnimationFrame(()=>observeReveals(target));
  resetFaqTreeForScreen(id);
}
function groupWord(n){const a=n%10,b=n%100;return a===1&&b!==11?'группа':a>=2&&a<=4&&(b<12||b>14)?'группы':'групп';}
const sportRoot=document.getElementById('sports-list');
if(sportRoot){
  sports.forEach((s,i)=>{
    const card=document.createElement('article');
    card.className='sport-card sport-card--expandable';
    const panelId='sport-details-'+i;
    const note=s.note?'<span class="pill">ℹ️ '+s.note+'</span>':'';
    card.innerHTML=
      '<button class="sport-card__toggle" type="button" aria-expanded="false" aria-controls="'+panelId+'">'+
        '<span class="sport-card__icon" aria-hidden="true">'+s.icon+'</span>'+
        '<span class="sport-card__summary"><span class="sport-card__name">'+s.name+'</span>'+
          '<span class="sport-meta">'+s.cities.map(city=>'<span class="pill">📍 '+city+'</span>').join('')+
          '<span class="pill pill--groups">'+s.groups+' '+groupWord(s.groups)+'</span>'+note+'</span>'+
        '</span><span class="sport-card__chevron" aria-hidden="true">⌄</span>'+
      '</button>'+
      '<div class="sport-card__panel" id="'+panelId+'" role="region" aria-label="Подробнее: '+s.name+'" aria-hidden="true">'+
        '<div class="sport-card__panel-inner">'+
          '<p>'+sportDescriptions[i]+'</p>'+
          '<div class="sport-card__detail-row"><span>📍 Города занятий</span><strong>'+s.cities.join(', ')+'</strong></div>'+
          '<div class="sport-card__detail-row"><span>👥 Физкультурно-оздоровительные группы</span><strong>'+s.groups+'</strong></div>'+
          '<p class="sport-card__disclaimer">Расписание, условия участия и доступность мест уточняйте в школе.</p>'+
          '<button class="sport-card__contact" type="button" data-target="contact-screen">Связаться с администрацией →</button>'+
        '</div>'+
      '</div>';
    sportRoot.appendChild(card);
  });
}
const faqRoot=document.getElementById('faq-list');if(faqRoot){faqs.forEach(([q,a],i)=>{const item=document.createElement('article');item.className='faq-item';item.innerHTML='<button class="faq-q" type="button" aria-expanded="false"><span><span class="faq-index">'+String(i+1).padStart(2,'0')+'</span>'+q+'</span><span class="faq-chevron">⌄</span></button><div class="faq-a"><div class="faq-a__inner">'+a+'</div></div>';faqRoot.appendChild(item);});}
document.addEventListener('click',e=>{const nav=e.target.closest('[data-target]');if(nav){showScreen(nav.dataset.target);return;}const sportToggle=e.target.closest('.sport-card__toggle');
if(sportToggle){
  const card=sportToggle.closest('.sport-card');
  const opening=!card.classList.contains('open');
  sportRoot?.querySelectorAll('.sport-card.open').forEach(other=>{
    other.classList.remove('open');
    other.querySelector('.sport-card__toggle')?.setAttribute('aria-expanded','false');
    other.querySelector('.sport-card__panel')?.setAttribute('aria-hidden','true');
  });
  if(opening){
    card.classList.add('open');
    sportToggle.setAttribute('aria-expanded','true');
    card.querySelector('.sport-card__panel')?.setAttribute('aria-hidden','false');
  }
  return;
}
const toggle=e.target.closest('.faq-q');if(toggle){const item=toggle.closest('.faq-item');const wasOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(el=>{el.classList.remove('open');el.querySelector('.faq-q')?.setAttribute('aria-expanded','false');});if(!wasOpen){item.classList.add('open');toggle.setAttribute('aria-expanded','true');}}});

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
function initWinterSnowfall(){
  const snowLayer=document.querySelector('.winter-snowfall');
  if(!snowLayer||!window.matchMedia)return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduceMotion.matches)return;
  const isSmall=window.matchMedia('(max-width: 600px)').matches;
  const amount=isSmall?18:34;
  const fragment=document.createDocumentFragment();
  for(let i=0;i<amount;i++){
    const flake=document.createElement('span');
    flake.className='winter-snowflake';
    const size=2+(i*7%6);
    const left=(i*37+11)%100;
    const duration=10+(i*11%13);
    const delay=-(i*13%22);
    const drift=(i%2===0?1:-1)*(12+i*5%42);
    flake.style.cssText='--flake-size:'+size+'px;--flake-left:'+left+'%;--flake-duration:'+duration+'s;--flake-delay:'+delay+'s;--flake-drift:'+drift+'px';
    fragment.appendChild(flake);
  }
  snowLayer.appendChild(fragment);
  document.addEventListener('visibilitychange',()=>{
    snowLayer.classList.toggle('winter-snowfall--paused',document.hidden);
  });
  reduceMotion.addEventListener?.('change',event=>{
    snowLayer.classList.toggle('winter-snowfall--paused',event.matches);
    if(event.matches)snowLayer.replaceChildren();
  });
}
let faqTreeTimeouts=[];
function resetFaqTreeForScreen(id){
  const widget=document.getElementById('faq-tree-widget');
  const layer=document.getElementById('faq-fireworks-layer');
  if(!widget)return;
  faqTreeTimeouts.forEach(clearTimeout);
  faqTreeTimeouts=[];
  layer?.replaceChildren();
  widget.classList.remove('faq-tree-widget--peeking','faq-tree-widget--celebrating','faq-tree-widget--retreating','faq-tree-widget--finished');
  if(id==='faq-screen'){
    widget.setAttribute('aria-hidden','false');
    widget.classList.add('faq-tree-widget--peeking');
  }else{
    widget.setAttribute('aria-hidden','true');
  }
}
function initFaqTreeSurprise(){
  const widget=document.getElementById('faq-tree-widget');
  const button=document.getElementById('faq-tree-button');
  const layer=document.getElementById('faq-fireworks-layer');
  if(!widget||!button||!layer)return;
  const palette=['#ffd166','#ff7190','#61caff','#a98fff','#6fe2a1','#ffffff'];
  const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  function firework(){
    layer.replaceChildren();
    const rect=button.getBoundingClientRect();
    const x=rect.left+rect.width*.42;
    const y=rect.top+rect.height*.36;
    const reduced=Boolean(reduceMotion?.matches);
    const count=reduced?5:32;
    const fragment=document.createDocumentFragment();
    for(let i=0;i<count;i++){
      const particle=document.createElement('span');
      particle.className='faq-firework-particle'+(reduced?' faq-firework-particle--still':'');
      const angle=2*Math.PI*i/count;
      const radius=45+(i*17%78);
      particle.style.left=x+'px';
      particle.style.top=y+'px';
      particle.style.setProperty('--burst-x',Math.cos(angle)*radius+'px');
      particle.style.setProperty('--burst-y',Math.sin(angle)*radius+'px');
      particle.style.setProperty('--burst-color',palette[i%palette.length]);
      particle.style.animationDelay=(i%4)*18+'ms';
      fragment.appendChild(particle);
    }
    layer.appendChild(fragment);
  }
  button.addEventListener('click',()=>{
    if(!document.getElementById('faq-screen')?.classList.contains('active'))return;
    if(!widget.classList.contains('faq-tree-widget--peeking'))return;
    widget.classList.remove('faq-tree-widget--peeking');
    widget.classList.add('faq-tree-widget--celebrating');
    const reduced=Boolean(reduceMotion?.matches);
    faqTreeTimeouts.push(setTimeout(firework,reduced?40:420));
    faqTreeTimeouts.push(setTimeout(()=>{
      widget.classList.remove('faq-tree-widget--celebrating');
      widget.classList.add('faq-tree-widget--retreating');
    },reduced?850:1500));
    faqTreeTimeouts.push(setTimeout(()=>{
      widget.classList.remove('faq-tree-widget--retreating');
      widget.classList.add('faq-tree-widget--finished');
      widget.setAttribute('aria-hidden','true');
      layer.replaceChildren();
    },reduced?950:2180));
  });
}
initFaqTreeSurprise();
initWinterSnowfall();
observeReveals(document.getElementById('main-screen'));
document.querySelectorAll('.bottom-nav button').forEach(button=>{
  const active=button.dataset.target==='main-screen';
  button.classList.toggle('is-active',active);
  if(active)button.setAttribute('aria-current','page');
});
window.showScreen=showScreen;
})();