import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { RootNavigator } from '@navigation/RootNavigator';
import { hydrateLanguage } from '@ds/language';
import { NetworkProvider, defaultGraphqlUrl } from '@ds/network';
import { hydrateThemePreference, TamaguiRoot } from '@ds/theme';
import { Hud, SheetProvider } from '@ds/ui';
import { appEnv } from '@ds/native';
import { resetAuth, useAuthStore } from '@ds/store';
import { initTelemetry, wrapRoot } from '@ds/telemetry';
import { setSplashDurationMs } from '@ds/views';
import { env } from './src/config/env';

const envTracesSampleRate = Number(env.SENTRY_TRACES_SAMPLE_RATE);
const flavorTracesSampleRate = appEnv === 'prod' ? 0.1 : 1;

hydrateThemePreference();
hydrateLanguage();
initTelemetry({
  dsn: env.SENTRY_DSN,
  environment: appEnv,
  tracesSampleRate: Number.isFinite(envTracesSampleRate)
    ? envTracesSampleRate
    : flavorTracesSampleRate,
});
resetAuth();

/**
 * SafeAreaProvider sits above the navigator so Sheet / Hud / Container
 * can read insets even as siblings of NavigationContainer.
 * Inter for RN Text is still a native asset; Skia graphs load Inter via useFont.
 */
function App(props: {detoxSplashMs?: string}) {
  const splashMs = Number(props.detoxSplashMs);
  if (Number.isFinite(splashMs) && splashMs > 0) {
    setSplashDurationMs(splashMs);
  }
  //build
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <TamaguiRoot>
          <NetworkProvider
            url={defaultGraphqlUrl(env.GRAPHQL_URL)}
            getAccessToken={() => useAuthStore.getState().session?.accessToken}
          >
            <SheetProvider>
              <RootNavigator />
              <Hud />
            </SheetProvider>
          </NetworkProvider>
        </TamaguiRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default wrapRoot(App);
