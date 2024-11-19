import { fetcher } from './lib/fetcher.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';

async function render(root, querystring) {
  
  try {
    const mainIndexJson = await fetcher('data/index.json');

    const params = new URLSearchParams(querystring);
    const type = params.get('type'); 
    const content = params.get('content'); 

    console.log('Type:', type, 'Content:', content);

    if (!type) {
      return renderIndexPage(root, mainIndexJson);
    }

    if (content) {
      document.title = `${type.toUpperCase()} - ${content.charAt(0).toUpperCase() + content.slice(1)}`;
      return renderContentPage(root, mainIndexJson, type, content);
    }

    document.title = `${type.toUpperCase()} Overview`;
    return renderSubpage(root, mainIndexJson, type);

  } catch (error) {
    console.error('Error rendering the page:', error);
    root.innerHTML = '<p>Þú er ekki vandamálið, það er ég.</p>';
  }
}

const root = document.querySelector('#app');
render(root, window.location.search);