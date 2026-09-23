import { StorageKey, storage } from '@ds/storage';
import type {AuthSession} from './types';

export function readSession(): AuthSession | null {
  const raw = storage.getString(StorageKey.Session);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.accessToken || !parsed.user?.email) {
      storage.remove(StorageKey.Session);
      return null;
    }
    return parsed;
  } catch {
    storage.remove(StorageKey.Session);
    return null;
  }
}

export function persistSession(session: AuthSession) {
  storage.set(StorageKey.Session, JSON.stringify(session));
}

export function clearPersistedSession() {
  storage.remove(StorageKey.Session);
}
