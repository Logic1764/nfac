import { useState } from 'react';
import { useAuthSession } from '../lib/AuthSessionContext';
import { supabase } from '../lib/supabase';

export function UserMenu() {
  const { session } = useAuthSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!session) return null;

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage('Не удалось выйти. Попробуй ещё раз.');
      setIsSigningOut(false);
    }
  }

  return (
    <div className="user-menu">
      <span className="user-menu__email">{session.user.email}</span>
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
