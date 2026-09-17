import {type ReactElement, type ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, type RenderOptions} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from '@auth/AuthProvider';
import {BootstrapProvider} from '@bootstrap/BootstrapProvider';
import {LanguageProvider} from '@i18n/LanguageProvider';
import {ThemePreferenceProvider} from '@theme/ThemePreferenceProvider';

const initialMetrics = {
  frame: {x: 0, y: 0, width: 390, height: 844},
  insets: {top: 47, left: 0, right: 0, bottom: 34},
};

function TestProviders({children}: {children: ReactNode}) {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <LanguageProvider>
        <ThemePreferenceProvider>
          <AuthProvider>
            <BootstrapProvider>
              <NavigationContainer>{children}</NavigationContainer>
            </BootstrapProvider>
          </AuthProvider>
        </ThemePreferenceProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {wrapper: TestProviders, ...options});
}
