import { create } from 'zustand';
import { captureException, clearUser, setUser } from '@ds/telemetry/telemetry';
import * as authService from './authService';
import { readSession } from './sessionStorage';
import { AuthError, type AuthCredentials, type AuthSession } from './types';

type AuthState = {
  session: AuthSession | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<void>;
  signOut: () => void;
  reset: () => void;
};

function identify(session: AuthSession | null) {
  if (session) {
    setUser({ id: session.user.id, email: session.user.email });
    return;
  }
  clearUser();
}

async function runAuth(
  action: (credentials: AuthCredentials) => Promise<AuthSession>,
  credentials: AuthCredentials,
): Promise<AuthSession> {
  try {
    return await action(credentials);
  } catch (error) {
    if (!(error instanceof AuthError)) {
      captureException(error);
    }
    throw error;
  }
}

export const useAuthStore = create<AuthState>(set => ({
  session: readSession(),
  signIn: async credentials => {
    const session = await runAuth(authService.signIn, credentials);
    identify(session);
    set({ session });
  },
  signUp: async credentials => {
    const session = await runAuth(authService.signUp, credentials);
    identify(session);
    set({ session });
  },
  signOut: () => {
    authService.signOut();
    identify(null);
    set({ session: null });
  },
  reset: () => {
    const session = readSession();
    identify(session);
    set({ session });
  },
}));

identify(useAuthStore.getState().session);

export function useSession() {
  return useAuthStore(state => state.session);
}

export function signIn(credentials: AuthCredentials) {
  return useAuthStore.getState().signIn(credentials);
}

export function signUp(credentials: AuthCredentials) {
  return useAuthStore.getState().signUp(credentials);
}

export function signOut() {
  useAuthStore.getState().signOut();
}

export function resetAuth() {
  useAuthStore.getState().reset();
}
