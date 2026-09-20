import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { hydrateLanguage } from '@ds/i18n/languageStore';
import { hydrateThemePreference } from '@ds/theme/themePreference';
import { TamaguiRoot } from '@ds/theme/TamaguiRoot';
import { resetAuth } from '@ds/session/authStore';
import { initTelemetry } from '@ds/telemetry/telemetry';
import { RootNavigator } from './navigation/RootNavigator';

hydrateThemePreference();
hydrateLanguage();
initTelemetry({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: import.meta.env.DEV ? 1 : 0.1,
});
resetAuth();

export default function App() {
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
