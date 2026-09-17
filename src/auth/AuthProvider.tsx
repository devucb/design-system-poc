import {createContext, useContext, useState, type ReactNode} from 'react';
import * as authService from './authService';
import {readSession} from './sessionStorage';
import type {AuthCredentials, AuthSession, AuthUser} from './types';

type AuthContextValue = {
  /** Persisted session, or null when signed out. */
  session: AuthSession | null;
  /** Convenience: session !== null. Prefer `session` when you need the user/token. */
  isAuthenticated: boolean;
  /** Signed-in user, or null. */
  user: AuthUser | null;
  /** Login with credentials. Writes the session to MMKV, then React state. */
  signIn: (credentials: AuthCredentials) => Promise<void>;
  /** Register with credentials. Same session contract as signIn. */
  signUp: (credentials: AuthCredentials) => Promise<void>;
  /** Clears the session from MMKV and memory. Root navigator unmounts SecureStack. */
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<AuthSession | null>(() => readSession());

  const signIn = async (credentials: AuthCredentials) => {
    setSession(await authService.signIn(credentials));
  };

  const signUp = async (credentials: AuthCredentials) => {
    setSession(await authService.signUp(credentials));
  };

  const signOut = () => {
    authService.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        user: session?.user ?? null,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
