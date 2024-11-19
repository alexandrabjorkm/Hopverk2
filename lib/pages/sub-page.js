import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';
import { render } from '../../main.js';

console.log('Render function imported:', render);

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el('header', {}, el('h1', {}, `${type.toUpperCase()} Efni`));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  // Create buttons for "Lykilhugtök" and "Spurningar"
  const mainElement = el('main', {});
  const buttonContainer = el('div', { class: 'button-container' });

  const keywordsButton = el('button', {}, 'Lykilhugtök');
  keywordsButton.addEventListener('click', () => {
    window.history.pushState({}, '', `?type=${type}&content=keywords`);
    render(root, `?type=${type}&content=keywords`);
  });

  const questionsButton = el('button', {}, 'Spurningar');
  questionsButton.addEventListener('click', () => {
    window.history.pushState({}, '', `?type=${type}&content=questions`);
    render(root, `?type=${type}&content=questions`);
  });

  buttonContainer.appendChild(keywordsButton);
  buttonContainer.appendChild(questionsButton);
  mainElement.appendChild(buttonContainer);

  const footerElement = el('footer', {}, indexJson.footer);

  root.innerHTML = '';
  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);

  document.title = `${type.toUpperCase()} Efni`;
}
