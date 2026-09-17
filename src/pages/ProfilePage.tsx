import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Auth } from '../components/Auth';
import { ProfileStats } from '../components/ProfileStats';
import { UserMenu } from '../components/UserMenu';
import { useAuthSession } from '../lib/AuthSessionContext';
import { loadQuizResults, type QuizResult } from '../lib/quizResults';

export function ProfilePage() {
  const { user, isInitialized } = useAuthSession();
  const [results, setResults] = useState<QuizResult[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setResults(null);
      return;
    }

    let isActive = true;
    setResults(null);
    setErrorMessage('');
    loadQuizResults(user.id)
      .then((nextResults) => {
        if (isActive) setResults(nextResults);
      })
      .catch(() => {
        if (isActive) setErrorMessage('Не удалось загрузить статистику. Попробуй обновить страницу.');
      });

    return () => { isActive = false; };
  }, [user]);

  const email = user?.email ?? '';
  const avatarLetter = email.charAt(0).toUpperCase() || '?';

  return (
    <main className="quiz-page">
      <div className="stars" aria-hidden="true" />
      <section className="quiz-shell" aria-labelledby="profile-title">
        <header className="quiz-header">
          <span className="quiz-header__icon" aria-hidden="true">✦</span>
          <div><p className="eyebrow">Личный кабинет</p><h1 id="profile-title">Профиль</h1></div>
          <UserMenu />
        </header>

        {!isInitialized ? (
          <section className="quiz-card" aria-live="polite">Проверяем вход…</section>
        ) : !user ? <Auth /> : (
          <section className="quiz-card profile-card">
            <div className="profile-identity">
              <span className="profile-avatar" aria-hidden="true">{avatarLetter}</span>
              <div><p className="profile-label">Email</p><h2>{email}</h2></div>
            </div>
            {errorMessage ? <p className="profile-error" role="alert">{errorMessage}</p>
              : results === null ? <p className="profile-loading">Загружаем статистику…</p>
                : <ProfileStats results={results} />}
            <Link className="profile-back" href="/">Вернуться к тесту</Link>
          </section>
        )}
      </section>
    </main>
  );
}
