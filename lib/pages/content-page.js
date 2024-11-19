import { renderNavigation } from '../components/navigation';
import { el } from '../elements';
import { fetcher } from '../fetcher.js';

export async function renderContentPage(root, mainIndexJson, type, content) {
  const headerElement = el('header', {}, el('h1', {}, mainIndexJson.title));
  headerElement.appendChild(renderNavigation(mainIndexJson.navigation));

  let mainElement;

  try {
    const contentJsonFile = `data/${type}/${content}.json`;
    const contentJson = await fetcher(contentJsonFile);

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    if (content === 'keywords') {
      for (const keyword of contentJson.keywords) {
        const keywordElement = el('div', { class: 'keyword-item' },
          el('h3', {}, keyword.title),
          el('p', {}, keyword.content),
          el('p', {}, `English: ${keyword.english || keyword.title}`)
        );
        contentContainer.appendChild(keywordElement);
      }
    }

    else if (content === 'questions') {
      for (const question of contentJson.questions) {
        const questionElement = el('div', { class: 'question-item' });

        const questionText = el('p', {}, question.question);
        questionElement.appendChild(questionText);

        const answersContainer = el('div', { class: 'answers-container' });

        question.answers.forEach((answer, index) => {
          const answerElement = el(
            'button',
            { class: 'answer-button', 'data-correct': answer.correct },
            `${index + 1}. ${answer.answer}`
          );

          answerElement.addEventListener('click', (e) => {
            const isCorrect = e.target.getAttribute('data-correct') === 'true';
            const feedback = isCorrect
              ? 'Rétt svar! Vel gert, þú ert alveg með þetta'
              : 'Rangt svar, reyndu aftur.';
            const feedbackElement = el('p', { class: 'feedback' }, feedback);

            const existingFeedback = questionElement.querySelector('.feedback');
            if (existingFeedback) {
              existingFeedback.remove();
            }
            questionElement.appendChild(feedbackElement);
          });

          answersContainer.appendChild(answerElement);
        });

        questionElement.appendChild(answersContainer);
        contentContainer.appendChild(questionElement);
      }
    }

    mainElement = el('main', {}, contentContainer);

  } catch (error) {
    console.error('Error fetching or rendering content:', error);
    mainElement = el('main', {}, el('p', {}, 'Failed to load content.'));
  }

  const footerElement = el('footer', {}, mainIndexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}

