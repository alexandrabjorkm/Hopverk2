import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';

async function renderKeywords(contentJson) {
  const container = document.createElement('div');
  container.classList.add('keywords-container');

  for (const [category, items] of Object.entries(contentJson)) {
    const categorySection = el('section', {}, el('h2', {}, category.toUpperCase()));

    items.forEach((keyword) => {
      const keywordElement = el(
        'article',
        {},
        el('h3', {}, keyword.title),
        el('p', {}, `English: ${keyword.english || keyword.title}`),
        el('p', {}, keyword.content)
      );
      categorySection.appendChild(keywordElement);
    });

    container.appendChild(categorySection);
  }

  return container;
}

async function renderQuestions(contentJson) {
  const container = document.createElement('div');
  container.classList.add('questions-container');

  contentJson.questions.forEach((question, index) => {
    const questionElement = el('article', {}, el('h3', {}, `Q${index + 1}: ${question.question}`));

    question.answers.forEach((answer, i) => {
      const answerElement = el('p', {}, `${i + 1}. ${answer.answer}`);
      answerElement.classList.add(answer.correct ? 'correct' : 'incorrect');
      questionElement.appendChild(answerElement);
    });

    container.appendChild(questionElement);
  });

  return container;
}

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let mainElement;
  try {
    const contentJsonFile = `data/${type}/${content || 'index'}.json`;
    const contentJson = await fetcher(contentJsonFile);

    if (type === 'keywords') {
      mainElement = el('main', {}, await renderKeywords(contentJson));
    } else if (type === 'questions') {
      mainElement = el('main', {}, await renderQuestions(contentJson));
    } else {
      mainElement = el('main', {}, el('p', {}, 'Invalid type specified.'));
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    mainElement = el('main', {}, el('p', {}, 'Failed to load content.'));
  }

  const footerElement = el('footer', {}, indexJson.footer);

  root.innerHTML = '';
  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);

  document.title = `${indexJson.title} - ${type.toUpperCase()}`;
}
