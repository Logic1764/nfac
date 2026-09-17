import { useCallback, useEffect, useRef, useState } from 'react';
import { Auth } from '../components/Auth';
import { QuestionCard } from '../components/QuestionCard';
import { QuizGenerator } from '../components/QuizGenerator';
import { QuizIntro } from '../components/QuizIntro';
import { ResultCard } from '../components/ResultCard';
import { UserMenu } from '../components/UserMenu';
import { XpCard } from '../components/XpCard';
import { useAuthSession } from '../lib/AuthSessionContext';
import { astronomyQuestions, type QuizQuestion } from '../lib/astronomyQuestions';
import { loadQuizResults, saveQuizResult } from '../lib/quizResults';
import { calculateXpProgress, type XpProgress } from '../lib/xp';

export function HomePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>(astronomyQuestions);
  const { user, isInitialized } = useAuthSession();
  const savedResult = useRef(false);
  const [xpProgress, setXpProgress] = useState<XpProgress | null>(null);

  const refreshXp = useCallback(async () => {
    if (!user) {
      setXpProgress(null);
      return;
    }

    try {
      const results = await loadQuizResults(user.id);
      setXpProgress(calculateXpProgress(results));
    } catch {
      setXpProgress(null);
    }
  }, [user]);

  useEffect(() => {
    void refreshXp();
  }, [refreshXp]);

  const isFinished = questionIndex === questions.length;

  function handleAnswer(answerIndex: number) {
    const isCorrect = answerIndex === questions[questionIndex].correctAnswer;
    const nextScore = score + (isCorrect ? 1 : 0);
    const isLastQuestion = questionIndex === questions.length - 1;

    setScore(nextScore);
    setQuestionIndex((currentIndex) => currentIndex + 1);

    if (isLastQuestion && !savedResult.current) {
      savedResult.current = true;
      void saveQuizResult(user?.id ?? null, nextScore, questions.length)
        .then((wasSaved) => {
          if (wasSaved) void refreshXp();
        });
    }
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setScore(0);
    savedResult.current = false;
    setHasStarted(true);
  }

  function startGeneratedQuiz(generatedQuestions: QuizQuestion[]) {
    setQuestions(generatedQuestions);
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

        {user && xpProgress ? <XpCard progress={xpProgress} compact /> : null}

        {!isInitialized ? (
          <section className="quiz-card" aria-live="polite">Проверяем вход…</section>
        ) : !user ? (
          <Auth />
        ) : !hasStarted ? (
          <div className="quiz-setup">
            <QuizGenerator onGenerated={startGeneratedQuiz} />
            <QuizIntro questionCount={questions.length} onStart={() => setHasStarted(true)} />
          </div>
        ) : isFinished ? (
          <ResultCard
            score={score}
            total={questions.length}
            onRestart={restartQuiz}
            needsSignIn={false}
          />
        ) : (
          <QuestionCard
            key={questionIndex}
            question={questions[questionIndex]}
            questionNumber={questionIndex + 1}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        )}
      </section>
    </main>
  );
}
