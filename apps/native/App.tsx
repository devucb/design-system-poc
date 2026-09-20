import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from '@navigation/RootNavigator';
import { hydrateLanguage } from '@ds/i18n/languageStore';
import { hydrateThemePreference } from '@ds/theme/themePreference';
import { TamaguiRoot } from '@ds/theme/TamaguiRoot';
import { resetAuth } from '@ds/session/authStore';
import { initTelemetry, wrapRoot } from '@ds/telemetry/telemetry';

hydrateThemePreference();
hydrateLanguage();
initTelemetry({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV ?? (__DEV__ ? 'development' : 'production'),
  tracesSampleRate: process.env.APP_ENV === 'prod' ? 0.1 : 1,
});
resetAuth();

/**
 * No SafeAreaProvider here: React Navigation mounts one internally with
 * initial window metrics. Screens read insets with `useSafeAreaInsets`.
 * Inter is linked as a native asset, so there is no JS font-loading gate.
 */
function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <TamaguiRoot>
        <RootNavigator />
      </TamaguiRoot>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default wrapRoot(App);
