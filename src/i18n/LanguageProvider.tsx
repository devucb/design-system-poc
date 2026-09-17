import {createContext, useContext, useState, type ReactNode} from 'react';
import {getLocales} from 'react-native-localize';
import i18n from 'i18next';
import {initReactI18next, I18nextProvider} from 'react-i18next';
import {StorageKey} from '@storage/keys';
import {storage} from '@storage/mmkv';
import en from './en';
import {
  AppLanguage,
  SUPPORTED_LANGUAGES,
  type AppLanguageCode,
} from './languages';
import tr from './tr';

function deviceLanguage(): AppLanguageCode {
  const locales = getLocales();
  const code = locales[0]?.languageCode;
  if (code && SUPPORTED_LANGUAGES.includes(code as AppLanguageCode)) {
    return code as AppLanguageCode;
  }
  return AppLanguage.English;
}

function readStoredLanguage(): AppLanguageCode {
  const stored = storage.getString(StorageKey.Language);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as AppLanguageCode)) {
    return stored as AppLanguageCode;
  }
  return deviceLanguage();
}

const initialLanguage = readStoredLanguage();

i18n.use(initReactI18next).init({
  resources: {
    [AppLanguage.English]: {translation: en},
    [AppLanguage.Turkish]: {translation: tr},
  },
  lng: initialLanguage,
  fallbackLng: AppLanguage.English,
  interpolation: {escapeValue: false},
  compatibilityJSON: 'v4',
});

type LanguageContextValue = {
  language: AppLanguageCode;
  setLanguage: (language: AppLanguageCode) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguageState] = useState<AppLanguageCode>(initialLanguage);

  const setLanguage = async (next: AppLanguageCode) => {
    setLanguageState(next);
    storage.set(StorageKey.Language, next);
    await i18n.changeLanguage(next);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={{language, setLanguage}}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useAppLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useAppLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
