import { renderNavigation } from '../components/navigation';
import { el } from '../elements';

export function renderIndexPage(root, indexJson) {
  console.log('rendering', root, indexJson.title);

  const headerElement = el(
    'header',
    {},
    el('h1', {}, indexJson.title),
    el('p', {}, indexJson.description),
    renderNavigation(indexJson.navigation)
  );

  const mainElement = el(
    'main',
    {},
    el(
      'section',
      {},));
    
  
  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);

  document.title = indexJson.title;
}

