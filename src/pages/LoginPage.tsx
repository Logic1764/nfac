import { Link } from 'wouter';
import { Auth } from '../components/Auth';

export function LoginPage() {
  return (
    <main>
      <Auth />
      <Link href="/">Вернуться к викторине</Link>
    </main>
  );
}
