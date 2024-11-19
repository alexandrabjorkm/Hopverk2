import { el } from '../elements.js';

export function renderNavigation(navigation, onClickHandler) {
  const navigationElement = el('ul', { class: 'navigation__list' });

  for (const item of navigation) {
    const { title, slug } = item;

    // Construct href based on the type and content
    let href;
    if (slug === 'keywords') {
      href = `/?type=${item.category}&content=keywords`;
    } else if (slug === 'questions') {
      href = `/?type=${item.category}&content=questions`;
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
