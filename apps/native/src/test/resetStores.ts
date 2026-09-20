import {cleanup} from '@testing-library/react-native';
import {hydrateLanguage, resetLanguage} from '@ds/i18n/languageStore';
import {resetAuth} from '@ds/session/authStore';
import {resetSplash} from '@ds/session/splashStore';
import {hydrateThemePreference, resetThemePreference} from '@ds/theme/themePreference';
import {clearMockStorage} from './setup';

hydrateThemePreference();
hydrateLanguage();

afterEach(async () => {
  cleanup();
  clearMockStorage();
  resetAuth();
  resetSplash();
  resetThemePreference();
  await resetLanguage();
});
