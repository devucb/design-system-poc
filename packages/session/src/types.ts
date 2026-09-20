export type AuthUser = {
  /** Stable user id from the backend (mock uses email for now). */
  id: string;
  /** Signed-in account email. */
  email: string;
};

export type AuthSession = {
  /** Access token used for authenticated API calls. */
  accessToken: string;
  /** Signed-in user. */
  user: AuthUser;
};

export type AuthCredentials = {
  /** Email submitted on Login / Register. */
  email: string;
  /** Password submitted on Login / Register. */
  password: string;
};

export const AuthErrorCode = {
  InvalidCredentials: 'invalid_credentials',
} as const;

export type AuthErrorCodeValue =
  (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export class AuthError extends Error {
  readonly code: AuthErrorCodeValue;

  constructor(code: AuthErrorCodeValue) {
    super(code);
    this.name = 'AuthError';
    this.code = code;
  }
}
