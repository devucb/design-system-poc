import { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import type { Preview } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hydrateLanguage } from '@ds/i18n/languageStore';
import type { ColorScheme } from '@ds/theme/preferences';
import { hydrateThemePreference } from '@ds/theme/themePreference';
import { TamaguiRoot } from '@ds/theme/TamaguiRoot';
import { Box } from '@ds/ui/Box/Box';

hydrateThemePreference();
hydrateLanguage();

const isTest =
  process.env.NODE_ENV === 'test' || Boolean(process.env.JEST_WORKER_ID);

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
    <SafeAreaProvider initialMetrics={initialMetrics} style={styles.root}>
      <TamaguiRoot scheme={isTest ? undefined : scheme}>
        {isTest ? (
          children
        ) : (
          <Box flex={1} backgroundColor="$backgroundBase">
            {children}
          </Box>
        )}
      </TamaguiRoot>
    </SafeAreaProvider>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const scheme: ColorScheme =
        context.globals?.theme === 'dark' ? 'dark' : 'light';
      return (
        <StoryProviders scheme={scheme}>
          <Story />
        </StoryProviders>
      );
    },
  ],
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default preview;
