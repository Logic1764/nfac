import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { ResultCard } from '../components/ResultCard';
import { astronomyQuestions } from '../lib/astronomyQuestions';

export function HomePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isFinished = questionIndex === astronomyQuestions.length;

  function handleAnswer(answerIndex: number) {
    if (answerIndex === astronomyQuestions[questionIndex].correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setScore(0);
  }

  return (
    <main className="quiz-page">
      <div className="stars" aria-hidden="true" />
      <section className="quiz-shell" aria-labelledby="quiz-title">
        <header className="quiz-header">
          <span className="quiz-header__icon" aria-hidden="true">✦</span>
          <div>
            <p className="eyebrow">Космический тест</p>
            <h1 id="quiz-title">Проверь знания по астрономии</h1>
          </div>
        </header>

        {isFinished ? (
          <ResultCard
            score={score}
            total={astronomyQuestions.length}
            onRestart={restartQuiz}
          />
        ) : (
          <QuestionCard
            question={astronomyQuestions[questionIndex]}
            questionNumber={questionIndex + 1}
            total={astronomyQuestions.length}
            onAnswer={handleAnswer}
          />
        )}
      </section>
    </main>
  );
}
