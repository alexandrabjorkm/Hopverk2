import { el } from '../elements.js';

export function renderNavigation(navigation, onClickHandler) {
  const navigationElement = el('ul', { class: 'navigation__list' });

  for (const item of navigation) {
    const { title, slug } = item;

    let href = '';
    if (slug === 'questions' || slug === 'keywords') {
      href = `/?type=${slug}&content=selection`;
    } else {
      href = `/?type=${slug}`;
    }
    
    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      el('a', { href, class: 'navigation__link' }, title),
    );

    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
}
