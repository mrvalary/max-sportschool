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
}
function groupWord(n){const a=n%10,b=n%100;return a===1&&b!==11?'группа':a>=2&&a<=4&&(b<12||b>14)?'группы':'групп';}
const sportRoot=document.getElementById('sports-list');if(sportRoot){sports.forEach(s=>{const card=document.createElement('article');card.className='sport-card';const note=s.note?'<span class="pill">ℹ️ '+s.note+'</span>':'';card.innerHTML='<div class="sport-card__icon">'+s.icon+'</div><div><h3>'+s.name+'</h3><div class="sport-meta">'+s.cities.map(c=>'<span class="pill">📍 '+c+'</span>').join('')+'<span class="pill pill--groups">'+s.groups+' '+groupWord(s.groups)+'</span>'+note+'</div></div>';sportRoot.appendChild(card);});}
const faqRoot=document.getElementById('faq-list');if(faqRoot){faqs.forEach(([q,a],i)=>{const item=document.createElement('article');item.className='faq-item';item.innerHTML='<button class="faq-q" type="button" aria-expanded="false"><span><span class="faq-index">'+String(i+1).padStart(2,'0')+'</span>'+q+'</span><span class="faq-chevron">⌄</span></button><div class="faq-a"><div class="faq-a__inner">'+a+'</div></div>';faqRoot.appendChild(item);});}
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
observeReveals(document.getElementById('main-screen'));
document.querySelectorAll('.bottom-nav button').forEach(button=>{
  const active=button.dataset.target==='main-screen';
  button.classList.toggle('is-active',active);
  if(active)button.setAttribute('aria-current','page');
});
window.showScreen=showScreen;
})();