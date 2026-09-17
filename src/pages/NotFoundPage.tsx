import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <main className="quiz-page">
      <div className="stars" aria-hidden="true" />
      <section className="quiz-card not-found-card">
        <p className="eyebrow">Ошибка 404</p>
        <h1>Такой страницы пока нет</h1>
        <p>Похоже, этот маршрут затерялся в космосе.</p>
        <Link className="primary-link" href="/">Вернуться к викторине</Link>
      </section>
    </main>
  );
}
