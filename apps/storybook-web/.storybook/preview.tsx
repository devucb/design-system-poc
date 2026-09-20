import { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hydrateLanguage } from '@ds/i18n/languageStore';
import type { ColorScheme } from '@ds/theme/preferences';
import { TamaguiRoot } from '@ds/theme/TamaguiRoot';
import { Box } from '@ds/ui/Box/Box';
import '../src/fonts.css';

hydrateLanguage();

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

function StoryProviders({
  children,
  scheme,
}: {
  children: ReactNode;
  scheme: ColorScheme;
}) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider initialMetrics={initialMetrics} style={styles.root}>
        <TamaguiRoot scheme={scheme}>
          <Box flex={1} backgroundColor="$backgroundBase">
            {children}
          </Box>
        </TamaguiRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      codePanel: true,
    },
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
    a11y: {
      test: 'error',
      config: {
        rules: [
          { id: 'landmark-one-main', enabled: false },
          { id: 'page-has-heading-one', enabled: false },
          { id: 'region', enabled: false },
        ],
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story, context) => {
      const scheme: ColorScheme =
        context.globals.theme === 'dark' ? 'dark' : 'light';
      return (
        <StoryProviders scheme={scheme}>
          <Story />
        </StoryProviders>
      );
    },
  ],
};

const styles = StyleSheet.create({
  root: { flex: 1, height: '100%', width: '100%' },
});

export default preview;
