import { fetcher } from './lib/fetcher.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';

async function handleNavigation(event) {
  event.preventDefault(); 
  const href = event.target.getAttribute('href'); 
  const url = new URL(href, window.location.origin); 
  history.pushState({}, '', url);
  render(root, url.search);
}

export async function render(root, querystring) {
  const mainIndexJson = await fetcher('data/index.json');

  const params = new URLSearchParams(querystring);
  const type = params.get('type');
  const content = params.get('content');

  if (!type) {
    return renderIndexPage(root, mainIndexJson);
  }

  if (content) {
    return renderContentPage(root, mainIndexJson, type, content);
  }

  return renderSubpage(root, mainIndexJson, type);
}

const root = document.querySelector('#app');
render(root, window.location.search);


window.addEventListener('popstate', () => {
  render(root, window.location.search); 
});
