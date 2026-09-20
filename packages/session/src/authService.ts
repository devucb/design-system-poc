import {clearSession, writeSession} from './sessionStorage';
import {
  AuthError,
  AuthErrorCode,
  type AuthCredentials,
  type AuthSession,
} from './types';

function normalizeCredentials(credentials: AuthCredentials): AuthCredentials {
  return {
    email: credentials.email.trim(),
    password: credentials.password,
  };
}

function assertCredentials(credentials: AuthCredentials) {
  if (!credentials.email.includes('@') || credentials.password.length === 0) {
    throw new AuthError(AuthErrorCode.InvalidCredentials);
  }
}

/**
 * Stand-in for POST /auth/login or /auth/register.
 * Swap this for a real fetch; persistence stays in sessionStorage.
 */
async function requestSession(
  kind: 'signIn' | 'signUp',
  credentials: AuthCredentials,
): Promise<AuthSession> {
  await Promise.resolve();
  assertCredentials(credentials);

  return {
    accessToken: `mock.${kind}.${Date.now()}`,
    user: {
      id: credentials.email,
      email: credentials.email,
    },
  };
}

export async function signIn(credentials: AuthCredentials): Promise<AuthSession> {
  const session = await requestSession('signIn', normalizeCredentials(credentials));
  writeSession(session);
  return session;
}

export async function signUp(credentials: AuthCredentials): Promise<AuthSession> {
  const session = await requestSession('signUp', normalizeCredentials(credentials));
  writeSession(session);
  return session;
}

export function signOut() {
  clearSession();
}
