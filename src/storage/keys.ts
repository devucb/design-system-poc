export const StorageKey = {
  ThemePreference: 'themePreference',
  Language: 'language',
  Session: 'session',
} as const;

export type StorageKeyValue = (typeof StorageKey)[keyof typeof StorageKey];
