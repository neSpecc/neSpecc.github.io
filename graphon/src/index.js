import Graphon from 'graphon';

console.log('Graphon', Graphon);
const wrapper = document.getElementById('graphs');
const modeToggler = document.createElement('div');

modeToggler.classList.add('mode-toggler');
modeToggler.textContent = 'Switch to Night Mode';

/**
 * Created Graphon instances will be stored here;
 */
const instances = [];

const sources = [
  {
    title: 'vc.ru',
    url: './data/vc.csv',
    urlByMonth: './data/vc-month.csv',
    // url: 'https://kmtt.ru/sheets/osnova_stats/vc',
    colors: ['#3497ED', '#F5BD25', '#f91d72'],
    labels: ['Регистрации', 'Статьи', 'Комментарии']
  },
  {
    title: 'TJ',
    // url: 'https://kmtt.ru/sheets/osnova_stats/tj',
    url: './data/tj.csv',
    urlByMonth: './data/tj-month.csv',
    colors: ['#3497ED', '#F5BD25', '#f91d72'],
    labels: ['Регистрации', 'Статьи', 'Комментарии']
  },
  {
    title: 'DTF',
    url: './data/dtf.csv',
    urlByMonth: './data/dtf-month.csv',
    // url: 'https://kmtt.ru/sheets/osnova_stats/dtf',
    colors: ['#3497ED', '#F5BD25', '#f91d72'],
    labels: ['Регистрации', 'Статьи', 'Комментарии']
  },
  {
    title: 'Платные функции по месяцам',
    url: './data/paid-all.csv',
    byMonth: true,
    // url: 'https://kmtt.ru/sheets/osnova_stats_month_paid/all',
    colors: ['#e25a76', '#db3053', '#af1e3c', 'rgb(51, 170, 221)', 'rgb(73, 154, 210)', 'rgb(240, 187, 19)', 'rgb(250, 216, 58)'],
    labels: ['Вакансии vc', 'Промо vc', 'Мероприятия vc', 'Вакансии dtf', 'Промо dtf', 'Промо TJ', 'Клуб TJ'],
    type: 'bar'
  },
];

sources.forEach(async (source, idx) => {
  /**
   * Create a holder
   */
  const holder = document.createElement('div');
  const graphId = `telegraph-${idx}`;

  holder.id = graphId;
  holder.classList.add('graph');

  wrapper.appendChild(holder);

  if (idx === 0) {
    wrapper.appendChild(modeToggler);
  }

  const data = await fetch(source.url).then((response) => response.text());
  let dataByMonth = null;

  if (source.urlByMonth) {
    dataByMonth = await fetch(source.urlByMonth).then((response) => response.text());
  }

  const graph = new Graphon({
    title: source.title,
    holderId: graphId,
    data,
    dataByMonth,
    type: source.type || 'line',
    colors: source.colors,
    titles: source.labels,
    byMonth: source.byMonth
  });

  instances.push(graph);

});

/**
 * Handler for Toggle Night mode button
 */
modeToggler.addEventListener('click', () => {
  instances.forEach( graph => {
    graph.toggleNightMode();
  });

  document.body.classList.toggle('night-mode');

  if (document.body.classList.contains('night-mode')){
    modeToggler.textContent = 'Switch to Day Mode';
  } else {
    modeToggler.textContent = 'Switch to Night Mode';
  }
});