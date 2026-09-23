import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { hydrateLanguage } from '@ds/language';
import { NetworkProvider, defaultGraphqlUrl } from '@ds/network';
import { hydrateThemePreference, TamaguiRoot } from '@ds/theme';
import { Hud, SheetProvider } from '@ds/ui';
import { appEnv } from '@ds/native';
import { resetAuth, useAuthStore } from '@ds/store';
import { initTelemetry } from '@ds/telemetry';
import { RootNavigator } from './navigation/RootNavigator';

hydrateThemePreference();
hydrateLanguage();
initTelemetry({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: appEnv,
  tracesSampleRate: Number(import.meta.env.SENTRY_TRACES_SAMPLE_RATE),
});
resetAuth();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <TamaguiRoot>
        <NetworkProvider
          url={defaultGraphqlUrl(import.meta.env.GRAPHQL_URL)}
          getAccessToken={() => useAuthStore.getState().session?.accessToken}
        >
          <SheetProvider>
            <RootNavigator />
            <Hud />
          </SheetProvider>
        </NetworkProvider>
      </TamaguiRoot>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
