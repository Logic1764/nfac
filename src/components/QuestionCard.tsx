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
  const progress = `${(questionNumber / total) * 100}%`;

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
            className="answer-button"
            key={answer}
            onClick={() => onAnswer(index)}
            type="button"
          >
            <span className="answer-letter">{answerLetters[index]}</span>
            <span>{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
