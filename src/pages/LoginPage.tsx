import { Link } from 'wouter';
import { Auth } from '../components/Auth';

export function LoginPage() {
  return (
    <main className="quiz-page">
      <div className="stars" aria-hidden="true" />
      <section className="quiz-shell auth-page">
        <Link className="profile-back" href="/">← К викторине</Link>
        <Auth />
      </section>
    </main>
  );
}
