import {type ReactElement, type ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, type RenderOptions} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {hydrateLanguage} from '@ds/i18n/languageStore';
import {hydrateThemePreference} from '@ds/theme/themePreference';
import {TamaguiRoot} from '@ds/theme/TamaguiRoot';

hydrateThemePreference();
hydrateLanguage();

const initialMetrics = {
  frame: {x: 0, y: 0, width: 390, height: 844},
  insets: {top: 47, left: 0, right: 0, bottom: 34},
};

function TestProviders({children}: {children: ReactNode}) {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <TamaguiRoot>
        <NavigationContainer>{children}</NavigationContainer>
      </TamaguiRoot>
    </SafeAreaProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {wrapper: TestProviders, ...options});
}
