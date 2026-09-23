import { create } from 'zustand';
import { clearUser, setUser } from '@ds/telemetry';
import {
  clearPersistedSession,
  persistSession,
  readSession,
} from './sessionStorage';
import type { AuthSession } from './types';

type AuthState = {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
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

export const useAuthStore = create<AuthState>(set => ({
  session: readSession(),
  setSession: session => {
    persistSession(session);
    identify(session);
    set({ session });
  },
  signOut: () => {
    clearPersistedSession();
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

export function setSession(session: AuthSession) {
  useAuthStore.getState().setSession(session);
}

export function signOut() {
  useAuthStore.getState().signOut();
}

export function resetAuth() {
  useAuthStore.getState().reset();
}
