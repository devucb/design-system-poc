export const AppLanguage = {
  English: 'en',
  Turkish: 'tr',
} as const;

export type AppLanguageCode = (typeof AppLanguage)[keyof typeof AppLanguage];

export const SUPPORTED_LANGUAGES: AppLanguageCode[] = [
  AppLanguage.English,
  AppLanguage.Turkish,
];
