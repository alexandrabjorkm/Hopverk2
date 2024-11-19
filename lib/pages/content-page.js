import { renderNavigation } from '../components/navigation';
import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';

export async function renderContentPage(root, indexJson, type, content) {
  const headerElement = el('header', {}, el('h1', {}, `${type.toUpperCase()} - ${content}`));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', {});

  try {
    const filePath = `data/${type}/${content}.json`;
    const contentJson = await fetcher(filePath);

    if (content === 'keywords') {
      contentJson.keywords.forEach((keyword) => {
        const keywordElement = el(
          'article',
          {},
          el('h3', {}, keyword.title),
          el('p', {}, `English: ${keyword.english || keyword.title}`),
          el('p', {}, keyword.content)
        );
        mainElement.appendChild(keywordElement);
      });
    } else if (content === 'questions') {
      contentJson.questions.forEach((question, index) => {
        const questionElement = el('article', {}, el('h3', {}, `${index + 1}: ${question.question}`));
        question.answers.forEach((answer, i) => {
          const answerElement = el('p', {}, `${i + 1}. ${answer.answer}`);
          answerElement.classList.add(answer.correct ? 'correct' : 'incorrect');
          questionElement.appendChild(answerElement);
        });
        mainElement.appendChild(questionElement);
      });
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    mainElement.appendChild(el('p', {}, 'Failed to load content.'));
  }

  const footerElement = el('footer', {}, indexJson.footer);

  root.innerHTML = '';
  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);

  document.title = `${type.toUpperCase()} - ${content}`;
}
