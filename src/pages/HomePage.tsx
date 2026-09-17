import { useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { ResultCard } from '../components/ResultCard';
import { astronomyQuestions } from '../lib/astronomyQuestions';
import { saveQuizResult } from '../lib/quizResults';

export function HomePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const isFinished = questionIndex === astronomyQuestions.length;

  function handleAnswer(answerIndex: number) {
    const isCorrect = answerIndex === astronomyQuestions[questionIndex].correctAnswer;
    const nextScore = score + (isCorrect ? 1 : 0);

    setScore(nextScore);

    if (questionIndex === astronomyQuestions.length - 1) {
      void saveQuizResult(nextScore, astronomyQuestions.length);
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
            key={questionIndex}
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
