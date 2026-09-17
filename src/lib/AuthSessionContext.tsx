import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from './supabase';

type AuthSessionContextValue = {
  session: Session | null;
  user: User | null;
  isInitialized: boolean;
  setAuthenticatedSession: (session: Session, user: User) => void;
  clearAuth: () => void;
};

const AuthSessionContext = createContext<AuthSessionContextValue | undefined>(undefined);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const loggedUserId = useRef<string | null>(null);

  function applySession(nextSession: Session | null, nextUser: User | null) {
    setSession(nextSession);
    setUser(nextUser);

    if (nextSession && nextUser && loggedUserId.current !== nextUser.id) {
      loggedUserId.current = nextUser.id;
      console.log('Auth ready:', { userId: nextUser.id, hasSession: true });
    } else if (!nextSession || !nextUser) {
      loggedUserId.current = null;
    }
  }

  function setAuthenticatedSession(nextSession: Session, nextUser: User) {
    applySession(nextSession, nextUser);
    setIsInitialized(true);
  }

  function clearAuth() {
    applySession(null, null);
    setIsInitialized(true);
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsInitialized(true);
      return;
    }

    let isActive = true;
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isActive) return;
      applySession(nextSession, nextSession?.user ?? null);
    });

    async function initializeAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (!isActive) return;

      if (error) console.error('Не удалось получить сессию:', error);
      applySession(data.session, data.session?.user ?? null);
      setIsInitialized(true);
    }

    void initializeAuth();

    return () => {
      isActive = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthSessionContext.Provider
      value={{ session, user, isInitialized, setAuthenticatedSession, clearAuth }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);
  if (!context) throw new Error('useAuthSession must be used inside AuthSessionProvider');
  return context;
}
