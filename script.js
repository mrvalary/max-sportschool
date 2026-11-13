(() => {
  const sports = [
    'Плавание', 'Иппотерапия', 'Футбол ЦП', 'Футбол ЛИН', 'Футзал',
    'Ритмика', 'Дзюдо', 'Самбо', 'Хоккей', 'Волейбол', 'ОФП',
    'Адаптивный бокс', 'Настольный теннис', 'Пауэрлифтинг', 'Дартс'
  ];

  const faqs = [
    ['Где находится организация?', 'Точный адрес лучше вывести после сверки с официальным сайтом школы. Пока используйте раздел «Связь с администрацией».'],
    ['Кто может заниматься адаптивным спортом?', 'Адаптивным спортом занимаются люди с инвалидностью и лица с ограниченными возможностями здоровья. Конкретные условия участия уточняются у администрации.'],
    ['Какие спортивные направления доступны?', `В приложении представлены ${sports.length} направлений. Откройте раздел «Спортивные направления», чтобы посмотреть список.`],
    ['Как узнать расписание занятий?', 'Расписание зависит от направления и места проведения занятий. Актуальную информацию уточняйте у администрации.'],
    ['Как записаться на занятия?', 'Для записи свяжитесь с администрацией. Сотрудники подскажут дальнейший порядок действий.'],
    ['Какие документы нужны для зачисления?', 'Перечень документов зависит от программы и этапа подготовки. Для точного перечня используйте официальную информацию школы или обратитесь к администрации.'],
    ['Платные или бесплатные занятия?', 'Условия по конкретному направлению необходимо уточнить у администрации.'],
    ['Как связаться с администрацией?', 'Телефоны: +7 (4212) 37-34-04 и +7 (4212) 30-49-60. Электронная почта: 4212304960@mail.ru.']
  ];

  const showScreen = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-target]');
    if (nav) {
      showScreen(nav.dataset.target);
      return;
    }

    const faqButton = e.target.closest('.faq-q');
    if (faqButton) {
      const item = faqButton.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    }
  });

  const sportsList = document.getElementById('sports-list');
  sports.forEach((name, index) => {
    const card = document.createElement('article');
    card.className = 'sport-card';
    card.innerHTML = `<span class="sport-number">${index + 1}</span><b>${name}</b>`;
    sportsList.appendChild(card);
  });

  const faqList = document.getElementById('faq-list');
  faqs.forEach(([q, a], index) => {
    const item = document.createElement('article');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q" type="button" aria-label="Открыть ответ на вопрос ${index + 1}">
        <span>${q}</span><span class="faq-chevron">⌄</span>
      </button>
      <div class="faq-a">${a}</div>`;
    faqList.appendChild(item);
  });

  window.showScreen = showScreen;
})();