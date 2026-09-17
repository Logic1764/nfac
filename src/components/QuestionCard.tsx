import { useState } from 'react';
import type { QuizQuestion } from '../lib/astronomyQuestions';

type QuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  onAnswer: (answerIndex: number) => void;
};

const answerLetters = ['A', 'B', 'C', 'D'];

export function QuestionCard({
  question,
  questionNumber,
  total,
  onAnswer,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const progress = `${(questionNumber / total) * 100}%`;
  const isLastQuestion = questionNumber === total;

  function submitAnswer() {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer);
    }
  }

  return (
    <div className="quiz-card">
      <div className="progress-row">
        <span>Вопрос {questionNumber} из {total}</span>
        <span>{questionNumber}/{total}</span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-bar" style={{ width: progress }} />
      </div>

      <h2>{question.text}</h2>
      <div className="answers" role="group" aria-label="Варианты ответа">
        {question.answers.map((answer, index) => (
          <button
            aria-pressed={selectedAnswer === index}
            className={`answer-button${selectedAnswer === index ? ' answer-button--selected' : ''}`}
            key={answer}
            onClick={() => setSelectedAnswer(index)}
            type="button"
          >
            <span className="answer-letter">{answerLetters[index]}</span>
            <span>{answer}</span>
          </button>
        ))}
      </div>
      <button
        className="next-button"
        disabled={selectedAnswer === null}
        onClick={submitAnswer}
        type="button"
      >
        {isLastQuestion ? 'Показать результат' : 'Следующий вопрос'}
      </button>
    </div>
  );
}
