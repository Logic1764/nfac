import { useRef, useState } from 'react';
import { Auth } from '../components/Auth';
import { QuestionCard } from '../components/QuestionCard';
import { QuizIntro } from '../components/QuizIntro';
import { ResultCard } from '../components/ResultCard';
import { UserMenu } from '../components/UserMenu';
import { useAuthSession } from '../lib/AuthSessionContext';
import { astronomyQuestions } from '../lib/astronomyQuestions';
import { saveQuizResult } from '../lib/quizResults';

export function HomePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { user, isInitialized } = useAuthSession();
  const savedResult = useRef(false);

  const isFinished = questionIndex === astronomyQuestions.length;

  function handleAnswer(answerIndex: number) {
    const isCorrect = answerIndex === astronomyQuestions[questionIndex].correctAnswer;
    const nextScore = score + (isCorrect ? 1 : 0);
    const isLastQuestion = questionIndex === astronomyQuestions.length - 1;

    setScore(nextScore);
    setQuestionIndex((currentIndex) => currentIndex + 1);

    if (isLastQuestion && !savedResult.current) {
      savedResult.current = true;
      void saveQuizResult(user?.id ?? null, nextScore, astronomyQuestions.length);
    }
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setScore(0);
    savedResult.current = false;
    setHasStarted(true);
  }

  return (
    <main className="quiz-page">
      <div className="stars" aria-hidden="true" />
      <section className="quiz-shell" aria-labelledby="quiz-title">
        <header className="quiz-header">
          <div className="quiz-brand">
            <span className="quiz-header__icon" aria-hidden="true">✦</span>
            <div>
              <p className="quiz-brand__name">Орбита</p>
              <h1 id="quiz-title">Астрономическая викторина</h1>
            </div>
          </div>
          <UserMenu />
        </header>

        {!isInitialized ? (
          <section className="quiz-card" aria-live="polite">Проверяем вход…</section>
        ) : !user ? (
          <Auth />
        ) : !hasStarted ? (
          <QuizIntro questionCount={astronomyQuestions.length} onStart={() => setHasStarted(true)} />
        ) : isFinished ? (
          <ResultCard
            score={score}
            total={astronomyQuestions.length}
            onRestart={restartQuiz}
            needsSignIn={false}
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
