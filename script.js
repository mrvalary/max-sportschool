(() => {
  const sports = [
    { name:'Плавание', icon:'🏊', cities:['Хабаровск','Комсомольск-на-Амуре'], groups:21 },
    { name:'Адаптивная верховая езда', icon:'🐎', cities:['Хабаровск'], groups:3, note:'с элементами иппотерапии' },
    { name:'Футбол с заболеванием ЦП', icon:'⚽', cities:['Хабаровск'], groups:1 },
    { name:'Футбол ЛИН', icon:'⚽', cities:['Хабаровск'], groups:1 },
    { name:'Футзал', icon:'🥅', cities:['Хабаровск'], groups:1 },
    { name:'Ритмика', icon:'🎵', cities:['Хабаровск'], groups:1 },
    { name:'Дзюдо', icon:'🥋', cities:['Хабаровск'], groups:2 },
    { name:'Самбо', icon:'🥋', cities:['Хабаровск'], groups:1 },
    { name:'Хоккей', icon:'🏒', cities:['Хабаровск'], groups:1 },
    { name:'Волейбол', icon:'🏐', cities:['Хабаровск'], groups:1 },
    { name:'ОФП', icon:'💪', cities:['Хабаровск'], groups:1 },
    { name:'Настольный теннис', icon:'🏓', cities:['Хабаровск','Комсомольск-на-Амуре'], groups:3 },
    { name:'Пауэрлифтинг', icon:'🏋️', cities:['Бикин'], groups:2 },
    { name:'Дартс', icon:'🎯', cities:['Комсомольск-на-Амуре'], groups:1 }
  ];

  const faqs = [
    ['Где находится организация?', 'Ресурсный центр расположен в Хабаровске по адресу: ул. Муравьёва-Амурского, 4, офис 217.'],
    ['Кто может заниматься адаптивным спортом?', 'В физкультурно-оздоровительных группах занимаются инвалиды и лица с ограниченными возможностями здоровья. Конкретные условия по выбранному направлению лучше уточнить у специалистов школы.'],
    ['Какие спортивные направления доступны?', 'На странице Ресурсного центра указаны 14 дисциплин в 40 группах: от плавания и единоборств до настольного тенниса, пауэрлифтинга и дартса.'],
    ['Как узнать расписание занятий?', 'Расписание зависит от дисциплины и места проведения. Для актуального расписания свяжитесь с администрацией или Ресурсным центром.'],
    ['Как записаться на занятия?', 'Свяжитесь с администрацией по телефону или оставьте обращение. Специалисты подскажут порядок действий для выбранной дисциплины.'],
    ['Какие документы нужны для зачисления?', 'Перечень документов зависит от программы и этапа подготовки. Перед подачей документов уточните актуальные требования у администрации школы.'],
    ['Платные или бесплатные занятия?', 'Условия по конкретной программе лучше уточнить у администрации, поскольку они могут отличаться.'],
    ['Как связаться с администрацией?', 'Основной телефон: +7 (4212) 37-34-04. Ресурсный центр: +7 (999) 080-48-52. E-mail: 4212304960@mail.ru.']
  ];

  const showScreen = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sportsList = document.getElementById('sports-list');
  sports.forEach((sport) => {
    const card = document.createElement('article');
    card.className = 'sport-card';
    card.innerHTML = `
      <div class="sport-icon">${sport.icon}</div>
      <div>
        <h3>${sport.name}</h3>
        ${sport.note ? `<div class="pill">${sport.note}</div>` : ''}
        <div class="sport-meta">
          ${sport.cities.map(city => `<span class="pill">📍 ${city}</span>`).join('')}
          <span class="pill pill--groups">${sport.groups} ${groupWord(sport.groups)}</span>
        </div>
      </div>`;
    sportsList.appendChild(card);
  });

  const faqList = document.getElementById('faq-list');
  faqs.forEach(([q,a], i) => {
    const item = document.createElement('article');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q" type="button" aria-expanded="false">
        <span><small style="color:var(--primary);margin-right:8px">${String(i+1).padStart(2,'0')}</small>${q}</span>
        <span class="faq-chevron">⌄</span>
      </button>
      <div class="faq-a">${a}</div>`;
    faqList.appendChild(item);
  });

  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-target]');
    if (nav) {
      showScreen(nav.dataset.target);
      return;
    }
    const q = e.target.closest('.faq-q');
    if (q) {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-q')?.setAttribute('aria-expanded','false');
      });
      if (!open) {
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
      }
    }
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.closest('.photo-card, .hero, .about-visual')?.classList.add('image-missing');
    });
  });

  function groupWord(n){
    const m10=n%10,m100=n%100;
    if(m10===1&&m100!==11)return 'группа';
    if(m10>=2&&m10<=4&&(m100<12||m100>14))return 'группы';
    return 'групп';
  }

  window.showScreen = showScreen;
})();