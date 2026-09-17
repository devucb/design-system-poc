import {type ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import type {Preview} from '@storybook/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LanguageProvider} from '@i18n/LanguageProvider';
import {ThemePreferenceProvider} from '@theme/ThemePreferenceProvider';

const initialMetrics = {
  frame: {x: 0, y: 0, width: 390, height: 844},
  insets: {top: 47, left: 0, right: 0, bottom: 34},
};

function StoryProviders({children}: {children: ReactNode}) {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics} style={styles.root}>
      <LanguageProvider>
        <ThemePreferenceProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </ThemePreferenceProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const preview: Preview = {
  decorators: [
    Story => (
      <StoryProviders>
        <Story />
      </StoryProviders>
    ),
  ],
};

const styles = StyleSheet.create({
  root: {flex: 1},
});

export default preview;
