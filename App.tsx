import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from '@auth/AuthProvider';
import {BootstrapProvider} from '@bootstrap/BootstrapProvider';
import {LanguageProvider} from '@i18n/LanguageProvider';
import {RootNavigator} from '@navigation/RootNavigator';
import {ThemePreferenceProvider} from '@theme/ThemePreferenceProvider';
import StorybookUI from './.rnstorybook';

/**
 * No SafeAreaProvider here: React Navigation mounts one internally with
 * initial window metrics. Screens read insets with `useSafeAreaInsets`.
 * Inter is linked as a native asset, so there is no JS font-loading gate.
 */
export default function App() {
  if (process.env.STORYBOOK_ENABLED === 'true') {
    return <StorybookUI />;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <LanguageProvider>
        <ThemePreferenceProvider>
          <AuthProvider>
            <BootstrapProvider>
              <RootNavigator />
            </BootstrapProvider>
          </AuthProvider>
        </ThemePreferenceProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
});
