export const ThemePreference = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type ThemePreferenceValue =
  (typeof ThemePreference)[keyof typeof ThemePreference];

export type ColorScheme = 'light' | 'dark';
