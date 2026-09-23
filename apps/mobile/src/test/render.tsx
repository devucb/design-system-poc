import {type ReactElement, type ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, type RenderOptions} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { hydrateLanguage } from '@ds/language';
import { NetworkProvider } from '@ds/network';
import { hydrateThemePreference, TamaguiRoot } from '@ds/theme';

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
        <NetworkProvider url="http://localhost:4000/graphql">
          <NavigationContainer>{children}</NavigationContainer>
        </NetworkProvider>
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
