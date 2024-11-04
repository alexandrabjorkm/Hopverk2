import { renderNavigation } from './lib/components/navigation.js';
import { el } from './lib/elements.js';
import { renderIndexPage } from './lib/pages/index-page.js';

async function fetchIndex() {
  const file = 'public/data/index.json';

  const response = await fetch(file);
  const json = await response.json();

  return json;
}

async function renderSubpage(root, indexJson, type) {
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let contentString = 'EFNI ER EKKI GILT';

  if (indexJson.navigation.find((i) => i.slug === type)) {
    contentString = type;
  }

  const mainElement = el('main', {}, el('p', {}, contentString));

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}

async function render(root, querystring) {
  const indexJson = await fetchIndex();

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  console.log(type);

  if (!type) {
    renderIndexPage(root, indexJson);
  } else {
    renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector('#app');

render(root, window.location.search);
