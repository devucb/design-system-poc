import {cleanup} from '@testing-library/react-native';
import { hydrateLanguage, resetLanguage } from '@ds/language';
import { resetAuth, resetSplash } from '@ds/store';
import { resetHud } from '@ds/ui';
import { hydrateThemePreference, resetThemePreference } from '@ds/theme';
import {clearMockStorage} from './setup';

hydrateThemePreference();
hydrateLanguage();

afterEach(async () => {
  cleanup();
  clearMockStorage();
  resetAuth();
  resetSplash();
  resetHud();
  resetThemePreference();
  await resetLanguage();
});
