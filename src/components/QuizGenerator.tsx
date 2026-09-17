import { useState, type FormEvent } from 'react';
import { generateQuiz } from '../lib/generateQuiz';
import type { QuizQuestion } from '../lib/astronomyQuestions';

type QuizGeneratorProps = {
  onGenerated: (questions: QuizQuestion[]) => void;
};

export function QuizGenerator({ onGenerated }: QuizGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTopic = topic.trim();
    if (!trimmedTopic || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');
    try {
      onGenerated(await generateQuiz(trimmedTopic));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Неизвестная ошибка. Попробуй ещё раз.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="quiz-card generator-card" aria-labelledby="generator-title">
      <p className="eyebrow">AI-викторина</p>
      <h2 id="generator-title">Выбери тему для нового полёта</h2>
      <form className="generator-form" onSubmit={handleSubmit}>
        <label htmlFor="quiz-topic">Тема викторины</label>
        <p className="generator-form__hint" id="quiz-topic-hint">
          Введите тему, например: Марс, Сатурн или черные дыры.
        </p>
        <div className="generator-form__controls">
          <input
            aria-describedby="quiz-topic-hint"
            id="quiz-topic"
            maxLength={120}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Например, Марс"
            type="text"
            value={topic}
          />
          <button className="primary-button" disabled={!topic.trim() || isLoading} type="submit">
            {isLoading ? 'Генерируем вопросы...' : 'Сгенерировать вопросы'}
          </button>
        </div>
      </form>
      <p className="generator-card__notice">ИИ может ошибаться. Проверяйте важную информацию.</p>
      {errorMessage && <p className="generator-card__error" role="alert">{errorMessage}</p>}
    </section>
  );
}
