/* Presentation structure is created before translation and simulation initialization. */
'use strict';
window.PresentationTranslations={
  'МГУ имени М. В. Ломоносова':'Lomonosov Moscow State University',
  'Факультет вычислительной математики и кибернетики':'Faculty of Computational Mathematics and Cybernetics',
  'Учебная интерактивная презентация':'Interactive educational presentation',
  'Отрицательное трение. Непрерывное движение. Дискретные удары.':'Negative friction. Continuous motion. Discrete impacts.',
  'Показ на проекторе':'Projector view','Обычный вид':'Standard view','Настройки опыта':'Experiment settings','Навигация':'Navigation',
  'Презентация':'Presentation','Теория по теме':'Theory','Авторы':'Authors','Выход':'Exit',
  'Титульная страница':'Title page','На весь экран':'Full screen','Обычный экран':'Exit full screen',
  'Начните с движения — исследуйте его на графиках.':'Start with motion — explore it through graphs.',
  'Эмблема МГУ':'MSU emblem','Эмблема ВМК':'CMC emblem','Место для официальной эмблемы':'Official emblem to be supplied',
  'Флуктуационные процессы':'Fluctuation Processes',
  'Физическая модель':'Physical model','Точное движение между ударами':'Exact motion between impacts',
  'Уравнение описывает одномерный осциллятор с отрицательным трением. Параметр δ ≥ 0 задаёт рост амплитуды.':'The equation describes a one-dimensional oscillator with negative friction. The parameter δ ≥ 0 controls amplitude growth.',
  'Здесь s — время от последнего пересечения x = 0, а vₙ — скорость после возможного удара.':'Here s is the time since the last crossing of x = 0, and vₙ is the velocity after any impact.',
  'Правило удара':'Impact rule',
  'При пересечении x = 0 удар происходит только при v⁻ > a. Скорость мгновенно уменьшается на h, координата остаётся нулевой. При v⁻ = a удара нет.':'At a crossing of x = 0, an impact occurs only if v⁻ > a. Velocity instantly decreases by h while position stays zero. There is no impact at v⁻ = a.',
  'Отображение за полпериода':'Half-period map',
  'Последовательные пересечения разделены временем π. Точки на графике отображения — пары скоростей после возможного удара.':'Successive crossings are separated by time π. Points on the map are pairs of velocities after any impact.',
  'Величины и единицы':'Quantities and units',
  'В модели используются безразмерные координата x, скорость v и время t. Обозначение [1] на осях означает безразмерную величину.':'Position x, velocity v and time t are dimensionless in this model. The axis notation [1] denotes a dimensionless quantity.',
  'Связь с размерными величинами: X = Lx, V = Lωv, τ = t/ω, где L — выбранный масштаб длины, ω — масштаб частоты. Модель не задаёт их численные значения.':'Dimensional quantities are X = Lx, V = Lωv and τ = t/ω, where L is a chosen length scale and ω is a frequency scale. Their numerical values are not specified by the model.',
  'Управление опытом':'Experiment controls',
  'Старт запускает новый опыт. Пауза сохраняет состояние и позволяет продолжить движение. Стоп завершает расчёт и оставляет графики на экране. Изменение параметра начинает новый опыт с t = 0.':'Start begins a new experiment. Pause preserves the state and allows motion to resume. Stop ends the calculation and keeps the graphs on screen. Changing a parameter starts a new experiment at t = 0.',
  'Выберите медленный темп для наблюдения ударов или быстрый для накопления точек. Для показа в аудитории используйте полноэкранный режим.':'Use slow speed to observe impacts or fast speed to accumulate points. Use full-screen mode for classroom projection.',
  'Источники':'Sources',
  'О. А. Чичигина. Флуктуационные процессы. Конспект лекций.':'O. A. Chichigina. Fluctuation Processes. Lecture Notes.',
  'Исходный код проекта':'Project source code','Команда проекта':'Project team','Авторы работы':'Project authors',
  'Григорьев Александр Сергеевич':'Aleksandr Sergeevich Grigoryev',
  'Журавлёва Светлана Викторовна':'Svetlana Viktorovna Zhuravleva',
  'Фотография не предоставлена':'Photograph not supplied',
  'Преподаватель-руководитель':'Supervising instructor','Ольга Александровна Чичигина':'Olga Alexandrovna Chichigina',
  'Завершение презентации':'End of presentation','Расчёт остановлен. Можно вернуться на титульную страницу или закрыть эту вкладку.':'The simulation has stopped. Return to the title page or close this tab.',
  'Вернуться на титульную':'Return to title page','Старт':'Start','Стоп':'Stop','● ОСТАНОВЛЕНО':'● STOPPED',
  'Медленно · 0.5×':'Slow · 0.5×','Обычно · 1×':'Normal · 1×','Быстро · 4×':'Fast · 4×',
  'x, v, t — безразмерные [1]':'x, v, t — dimensionless [1]',
  'Полноэкранный режим недоступен. Используйте полноэкранный режим браузера.':'Full screen is unavailable. Use your browser’s full-screen mode.'
};
const lab=document.querySelector('main');lab.id='laboratory';lab.classList.add('view');lab.hidden=true;
document.querySelector('header').insertAdjacentHTML('beforeend','<nav class="presentation-nav" aria-label="Навигация"><button data-view="title">Титульная страница</button><button id="projector">Показ на проекторе</button><button id="settingsPanel">Настройки опыта</button><button id="fullscreen">На весь экран</button></nav>');
document.body.insertAdjacentHTML('beforeend',`
<main id="title" class="view title-view">
  <div class="institution"><div class="faculty-emblem"><img src="msu-logo.png" alt="Эмблема МГУ" width="850" height="830"></div><div><p>МГУ имени М. В. Ломоносова</p><h2>Факультет вычислительной математики и кибернетики</h2></div><div class="faculty-emblem"><img src="vmk-logo.png" alt="Эмблема ВМК" width="3028" height="3196"></div></div>
  
  <section class="title-hero"><div class="title-copy"><div class="eyebrow">Учебная интерактивная презентация</div><h1>Осциллятор Неймарка<span>.</span></h1><div class="title-actions"><button class="primary" data-view="laboratory">Презентация</button><button data-view="theory">Теория по теме</button><button data-view="authors">Авторы</button><button data-view="exit">Выход</button></div></div><div class="hero-orbit" aria-hidden="true"><svg viewBox="0 0 400 400"><path class="orbit-grid" d="M20 200H380 M200 20V380"/><path class="orbit-line" d="M200 200 C200 180 230 180 235 202 C247 250 166 260 152 205 C130 120 258 110 279 197 C311 328 112 334 86 207 C47 17 334 28 348 191 C366 373 33 394 32 199"/><path class="orbit-jump" d="M200 44V218"/><circle cx="200" cy="218" r="9"/></svg><span>x · v</span></div></section>
  <div class="title-bottom"><span>Флуктуационные процессы</span><span>2026 · МГУ · ВМК</span></div>
</main>
<main id="theory" class="view reading-view" hidden><div class="eyebrow">Теория по теме</div><h1>Физическая модель</h1><div class="theory-grid">
<article class="panel"><h2>Точное движение между ударами</h2><p>Уравнение описывает одномерный осциллятор с отрицательным трением. Параметр δ ≥ 0 задаёт рост амплитуды.</p><div class="theory-equation">ẍ − 2δẋ + (1 + δ²)x = 0</div><div class="theory-equation">x(s) = vₙe<sup>δs</sup> sin s<br>v(s) = vₙe<sup>δs</sup>(cos s + δ sin s)</div><p>Здесь s — время от последнего пересечения x = 0, а vₙ — скорость после возможного удара.</p></article>
<article class="panel"><h2>Правило удара</h2><p>При пересечении x = 0 удар происходит только при v⁻ > a. Скорость мгновенно уменьшается на h, координата остаётся нулевой. При v⁻ = a удара нет.</p><div class="theory-equation">v⁺ = v⁻ − h</div><h2>Отображение за полпериода</h2><p>Последовательные пересечения разделены временем π. Точки на графике отображения — пары скоростей после возможного удара.</p><div class="theory-equation">vₙ₊₁ = −qvₙ − hΘ(−qvₙ − a)<br>q = e<sup>πδ</sup></div></article>
<article class="panel"><h2>Величины и единицы</h2><p>В модели используются безразмерные координата x, скорость v и время t. Обозначение [1] на осях означает безразмерную величину.</p><p>Связь с размерными величинами: X = Lx, V = Lωv, τ = t/ω, где L — выбранный масштаб длины, ω — масштаб частоты. Модель не задаёт их численные значения.</p></article>
<article class="panel"><h2>Управление опытом</h2><p>Старт запускает новый опыт. Пауза сохраняет состояние и позволяет продолжить движение. Стоп завершает расчёт и оставляет графики на экране. Изменение параметра начинает новый опыт с t = 0.</p><p>Выберите медленный темп для наблюдения ударов или быстрый для накопления точек. Для показа в аудитории используйте полноэкранный режим.</p></article></div>
<section class="sources panel"><h2>Источники</h2><ol><li>О. А. Чичигина. Флуктуационные процессы. Конспект лекций.</li><li><a href="https://github.com/falsealarm478/neimark-oscillator" target="_blank" rel="noopener">Исходный код проекта</a></li></ol></section></main>
<main id="authors" class="view reading-view" hidden><div class="eyebrow">Команда проекта</div><h1>Авторы работы</h1><p>МГУ имени М. В. Ломоносова</p><p>Факультет вычислительной математики и кибернетики</p><div class="author-grid"><article class="panel author-card"><div class="portrait portrait-photo portrait-alexander"><img src="alexander.png" alt="Григорьев Александр Сергеевич" width="1152" height="1280"></div><h2>Григорьев Александр Сергеевич</h2></article><article class="panel author-card"><div class="portrait portrait-photo portrait-svetlana"><img src="svetlana.jpg" alt="Журавлёва Светлана Викторовна"></div><h2>Журавлёва Светлана Викторовна</h2></article></div><section class="panel supervisor"><h2>Преподаватель-руководитель</h2><p>Ольга Александровна Чичигина</p></section></main>
<main id="exit" class="view reading-view exit-view" hidden><div class="eyebrow">Завершение презентации</div><h1>Расчёт остановлен.</h1><p>Расчёт остановлен. Можно вернуться на титульную страницу или закрыть эту вкладку.</p><button class="primary" data-view="title">Вернуться на титульную</button></main>`);
window.PresentationTranslations['Место для официальной эмблемы МГУ']='Space for the official MSU emblem';
  window.PresentationTranslations['Расчёт остановлен.']='Simulation stopped.';
document.querySelector('.transport').insertAdjacentHTML('beforebegin','<button id="start" class="primary start-button">Старт</button>');
document.querySelector('.transport').insertAdjacentHTML('afterend','<button id="stop" class="stop-button">Стоп</button>');
document.querySelector('.readout-note').textContent='x, v, t — безразмерные [1]';
document.querySelector('#speed').innerHTML='<option value="0.5">Медленно · 0.5×</option><option value="1" selected>Обычно · 1×</option><option value="4">Быстро · 4×</option>';
