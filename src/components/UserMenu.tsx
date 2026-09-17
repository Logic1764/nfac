import { useState } from 'react';
import { Link } from 'wouter';
import { useAuthSession } from '../lib/AuthSessionContext';
import { supabase } from '../lib/supabase';

export function UserMenu() {
  const { user, clearAuth } = useAuthSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!user) return null;

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage('Не удалось выйти. Попробуй ещё раз.');
      setIsSigningOut(false);
      return;
    }

    clearAuth();
  }

  return (
    <div className="user-menu">
      <Link className="user-menu__profile-link" href="/profile">Профиль</Link>
      <button
        className="user-menu__sign-out"
        disabled={isSigningOut}
        onClick={handleSignOut}
        type="button"
      >
        {isSigningOut ? 'Выходим…' : 'Выйти'}
      </button>
      {errorMessage && <p className="user-menu__error" role="alert">{errorMessage}</p>}
    </div>
  );
}
