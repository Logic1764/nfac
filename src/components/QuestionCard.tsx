import { useState } from 'react';
import type { QuizQuestion } from '../lib/astronomyQuestions';

type QuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  onAnswer: (answerIndex: number) => void;
};

const answerLetters = ['A', 'B', 'C', 'D'];

function shuffleAnswers(answers: string[]) {
  const shuffledAnswers = answers.map((text, originalIndex) => ({ text, originalIndex }));

  for (let index = shuffledAnswers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledAnswers[index], shuffledAnswers[randomIndex]] = [
      shuffledAnswers[randomIndex],
      shuffledAnswers[index],
    ];
  }

  return shuffledAnswers;
}

export function QuestionCard({
  question,
  questionNumber,
  total,
  onAnswer,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffledAnswers] = useState(() => shuffleAnswers(question.answers));
  const progress = `${(questionNumber / total) * 100}%`;
  const isLastQuestion = questionNumber === total;

  function submitAnswer() {
    if (selectedAnswer !== null) {
      onAnswer(shuffledAnswers[selectedAnswer].originalIndex);
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
        {shuffledAnswers.map((answer, index) => (
          <button
            aria-pressed={selectedAnswer === index}
            className={`answer-button${selectedAnswer === index ? ' answer-button--selected' : ''}`}
            key={answer.originalIndex}
            onClick={() => setSelectedAnswer(index)}
            type="button"
          >
            <span className="answer-letter">{answerLetters[index]}</span>
            <span>{answer.text}</span>
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
