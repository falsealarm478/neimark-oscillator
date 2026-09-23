/* Local, dependency-free translations. Text nodes are retained so controls keep their state. */
'use strict';
const I18n=(()=>{
  const en={
    'ДИНАМИКА':'DYNAMICS',
    'ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ':'VIRTUAL LABORATORY',
    'ЭКСПЕРИМЕНТ 08.3':'EXPERIMENT 08.3',
    'ЛОКАЛЬНО · БЕЗ СЕТИ':'LOCAL · OFFLINE',
    'ОТРИЦАТЕЛЬНОЕ ТРЕНИЕ / ИМПУЛЬСНОЕ ДВИЖЕНИЕ':'NEGATIVE FRICTION / IMPULSIVE MOTION',
    'Осциллятор Неймарка':'Neimark oscillator',
    'Осциллятор Неймарка · Динамическая лаборатория':'Neimark oscillator · Dynamics laboratory',
    'Интерактивная лаборатория осциллятора Неймарка: движение, фазовая траектория и отображение Пуанкаре.':'Interactive Neimark oscillator laboratory: motion, phase trajectory and Poincaré map.',
    'Одно движение. Три представления. Наблюдайте, как растущая спираль меняется при ударе.':'One motion. Three views. Watch how an impact transforms an expanding spiral.',
    'Как читать эксперимент':'How to read the experiment',
    'Параметры':'Parameters', '01 — УПРАВЛЕНИЕ':'01 — CONTROLS', 'Сценарий':'Scenario',
    'Рост и удары':'Growth and impacts', 'Медленное нарастание':'Slow growth',
    'Свободная спираль · h = 0':'Free spiral · h = 0', 'Свои параметры':'Custom parameters',
    'Отрицательное трение':'Negative friction', 'Порог удара':'Impact threshold',
    'Скачок скорости':'Velocity jump', 'Начальная скорость':'Initial velocity',
    'Изменение параметров начинает новый опыт. Начальная координата x₀ = 0.':'Changing parameters starts a new experiment. Initial position x₀ = 0.',
    'Ⅱ Пауза':'Ⅱ Pause', '▶ Продолжить':'▶ Resume', 'Начать заново':'Restart',
    'Шаг на полпериода':'Half-period step', 'Темп анимации':'Animation speed',
    'Проекция скорости':'Velocity projection', 'Точки сечения x = 0':'Section points at x = 0',
    'МЕЖДУ УДАРАМИ':'BETWEEN IMPACTS', 'При x = 0 и v⁻ > a: v⁺ = v⁻ − h':'At x = 0 and v⁻ > a: v⁺ = v⁻ − h',
    'Движение осциллятора':'Oscillator motion', '● ДВИЖЕНИЕ':'● RUNNING', '● ПАУЗА':'● PAUSED', '● УДАР':'● IMPACT',
    'Анимация одномерного осциллятора с пружиной':'Animation of a one-dimensional spring oscillator',
    'ВРЕМЯ t':'TIME t', 'КООРДИНАТА x':'POSITION x', 'СКОРОСТЬ v':'VELOCITY v', 'УДАРЫ':'IMPACTS',
    'Безразмерные величины':'Dimensionless quantities', 'Полпериода Δt = π':'Half-period Δt = π',
    'Фазовая траектория':'Phase trajectory', 'Текущее состояние и след движения':'Current state and motion trail',
    'Фазовый портрет: координата x и скорость v':'Phase portrait: position x and velocity v',
    'Движение':'Motion', 'Скачок при ударе':'Impact jump', 'Автомасштаб':'Auto scale',
    'Скорость во времени':'Velocity over time', 'Та же скорость — на временной оси':'The same velocity on a time axis',
    'График скорости от времени':'Velocity versus time graph', 'Окно: 8 полупериодов':'Window: 8 half-periods', 'Порог a':'Threshold a',
    '04 — СЕЧЕНИЕ ПУАНКАРЕ':'04 — POINCARÉ SECTION',
    'От полупериода':'From one half-period', 'к полупериоду':'to the next',
    'Каждая точка связывает две последовательные скорости при x = 0, сразу после возможного удара.':'Each point links two successive velocities at x = 0, immediately after any impact.',
    '0 пересечений':'Crossings: 0', 'Скачать точки · CSV ↗':'Download points · CSV ↗',
    'Отображение за полпериода: v n плюс 1 от v n':'Half-period map: v n plus 1 versus v n',
    'Наблюдаемые пары':'Observed pairs', 'Пунктир: vₙ₊₁ = vₙ':'Dashed: vₙ₊₁ = vₙ',
    'ПО МОДЕЛИ ИЗ FPAllbook · § 8.3 · СТР. 75–76':'BASED ON FPAllbook · § 8.3 · PP. 75–76',
    'Точное решение между ударами':'Exact solution between impacts', 'Закрыть':'Close',
    'КАК ЧИТАТЬ ЭКСПЕРИМЕНТ':'HOW TO READ THE EXPERIMENT',
    'Следуйте за светящейся точкой':'Follow the glowing point',
    'Пружина показывает координату частицы. Стрелка рядом с частицей показывает направление и величину скорости. Длина пружины условная; координата подписана на оси.':'The spring shows the particle’s position. The arrow next to the particle shows the direction and magnitude of its velocity. Spring length is schematic; position is marked on the axis.',
    'Фазовый портрет:':'Phase portrait:',
    'по горизонтали — координата x, по вертикали — скорость v. Зелёный след — движение между ударами. Оранжевый отрезок на x = 0 — мгновенный скачок скорости.':'position x is horizontal and velocity v is vertical. The green trail shows motion between impacts. The orange segment at x = 0 is an instantaneous velocity jump.',
    'График v(t):':'Graph v(t):',
    'зелёная точка имеет ту же высоту, что и точка фазовой траектории. Пунктирная проекция связывает два графика. Шкала скорости у них общая.':'the green point has the same height as the point on the phase trajectory. A dashed projection links the two graphs. They share the same velocity scale.',
    'Отображение:':'Map:',
    'фиолетовые точки — пары (vₙ, vₙ₊₁). Линия показывает точное правило перехода за π единиц времени. Разрыв линии соответствует порогу удара.':'purple points are pairs (vₙ, vₙ₊₁). The line shows the exact transition rule over π time units. The discontinuity corresponds to the impact threshold.',
    'Нажмите «Шаг на полпериода», чтобы остановить анимацию и продвинуть время на π. В сечении учитывается скорость после скачка. Удар происходит только при положительной скорости v > a; при v = a удара нет.':'Click “Half-period step” to pause the animation and advance time by π. The section records velocity after the jump. An impact occurs only for positive velocity v > a; there is no impact at v = a.',
    'След хранит последние 24 полупериода, график скорости — 8, отображение и экспорт — до 2000 последних переходов. При слишком большом размахе опыт автоматически останавливается.':'The trail retains the last 24 half-periods, the velocity graph shows 8, and the map and export retain up to 2000 recent transitions. The experiment stops automatically if the amplitude becomes too large.',
    'К эксперименту →':'Back to experiment →',
    'УДАР · −h':'IMPACT · −h',
    'Точки появятся при пересечении x = 0':'Points appear when crossing x = 0',
    'Движение вышло за диапазон |x|, |v| ≤ 10 000. Увеличьте h, уменьшите δ или начните заново.':'Motion exceeded the range |x|, |v| ≤ 10,000. Increase h, decrease δ or restart.'
  };
  Object.assign(en,window.PresentationTranslations||{});
  let language='ru';
  try{if(localStorage.getItem('neimark-language')==='en')language='en';}catch{/* Storage can be disabled, including for local files. */}
  const textNodes=[];
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(en[node.textContent.trim()])textNodes.push({node,original:node.textContent});
  }
  const attributes=[];
  document.querySelectorAll('[aria-label],[title],[alt],meta[name="description"]').forEach(node=>{
    for(const key of ['aria-label','title','alt','content']){
      const original=node.getAttribute(key);
      if(original&&en[original])attributes.push({node,key,original});
    }
  });
  const title=document.title;
  const switcher=document.createElement('div');
  switcher.className='language-switch';switcher.setAttribute('role','group');
  for(const code of ['ru','en']){
    const button=document.createElement('button');button.type='button';button.textContent=code.toUpperCase();button.lang=code;
    button.setAttribute('aria-label',code==='ru'?'Русский':'English');
    button.onclick=()=>setLanguage(code);switcher.append(button);
  }
  document.querySelector('header').append(switcher);
  function t(source){return language==='en'?(en[source]||source):source;}
  function setLanguage(code){
    language=code==='en'?'en':'ru';document.documentElement.lang=language;document.title=t(title);
    for(const {node,original} of textNodes)node.textContent=original.replace(original.trim(),t(original.trim()));
    for(const {node,key,original} of attributes)node.setAttribute(key,t(original));
    switcher.setAttribute('aria-label',language==='en'?'Interface language':'Язык интерфейса');
    [...switcher.children].forEach(button=>button.setAttribute('aria-pressed',String(button.lang===language)));
    try{localStorage.setItem('neimark-language',language);}catch{/* Switching still works without persistence. */}
    document.dispatchEvent(new Event('languagechange'));
  }
  setLanguage(language);
  return {t,get language(){return language;}};
})();
