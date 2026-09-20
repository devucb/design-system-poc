import {create} from 'zustand';
import {getLocales} from 'react-native-localize';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {StorageKey} from '@ds/storage/keys';
import {storage} from '@ds/storage/mmkv';
import {
  AppLanguage,
  SUPPORTED_LANGUAGES,
  type AppLanguageCode,
} from './languages';
import en from './locales/en.json';
import tr from './locales/tr.json';

type LanguageState = {
  language: AppLanguageCode
};

let i18nStarted = false;

function deviceLanguage(): AppLanguageCode {
  const code = getLocales()[0]?.languageCode;
  if (code && SUPPORTED_LANGUAGES.includes(code as AppLanguageCode)) {
    return code as AppLanguageCode;
  }
  return AppLanguage.English;
}

export function readStoredLanguage(): AppLanguageCode {
  const stored = storage.getString(StorageKey.Language);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as AppLanguageCode)) {
    return stored as AppLanguageCode;
  }
  return deviceLanguage();
}

function ensureI18n(language: AppLanguageCode) {
  if (i18nStarted) {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
    return;
  }

  i18n.use(initReactI18next).init({
    resources: {
      [AppLanguage.English]: {translation: en},
      [AppLanguage.Turkish]: {translation: tr},
    },
    lng: language,
    fallbackLng: AppLanguage.English,
    interpolation: {escapeValue: false},
    compatibilityJSON: 'v4',
  });
  i18nStarted = true;
}

export const useLanguageStore = create<LanguageState>(() => ({
  language: AppLanguage.English,
}));

export function hydrateLanguage() {
  const language = readStoredLanguage();
  useLanguageStore.setState({language});
  ensureI18n(language);
}

export function useAppLanguage() {
  return useLanguageStore(state => state.language);
}

export async function setLanguage(language: AppLanguageCode) {
  if (useLanguageStore.getState().language === language) {
    return;
  }
  useLanguageStore.setState({language});
  storage.set(StorageKey.Language, language);
  await i18n.changeLanguage(language);
}

export async function resetLanguage() {
  const language = readStoredLanguage();
  useLanguageStore.setState({language});
  if (!i18nStarted || i18n.language === language) {
    return;
  }
  await i18n.changeLanguage(language);
}
