import { useEffect, useRef, useState } from 'react';
import { QuestionCard } from '../components/QuestionCard';
import { ResultCard } from '../components/ResultCard';
import { UserMenu } from '../components/UserMenu';
import { useAuthSession } from '../lib/AuthSessionContext';
import { astronomyQuestions } from '../lib/astronomyQuestions';
import { saveQuizResult } from '../lib/quizResults';

export function HomePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { session, isLoading: isSessionLoading } = useAuthSession();
  const savedResult = useRef(false);

  const isFinished = questionIndex === astronomyQuestions.length;

  useEffect(() => {
    if (!isFinished || isSessionLoading || savedResult.current) return;

    savedResult.current = true;
    void saveQuizResult(score, astronomyQuestions.length);
  }, [isFinished, isSessionLoading, score]);

  function handleAnswer(answerIndex: number) {
    const isCorrect = answerIndex === astronomyQuestions[questionIndex].correctAnswer;
    const nextScore = score + (isCorrect ? 1 : 0);

    setScore(nextScore);

    setQuestionIndex((currentIndex) => currentIndex + 1);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setScore(0);
    savedResult.current = false;
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
          <UserMenu />
        </header>

        {isFinished ? (
          <ResultCard
            score={score}
            total={astronomyQuestions.length}
            onRestart={restartQuiz}
            needsSignIn={!isSessionLoading && !session}
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
