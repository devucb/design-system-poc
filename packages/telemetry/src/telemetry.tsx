import * as Sentry from '@sentry/react-native';
import { logger as sentryLogger } from '@sentry/react-native';
import type { ComponentType, ReactNode } from 'react';
import {
  getActiveRouteName,
  type InitTelemetryOptions,
  type TelemetryLogAttributes,
  type TelemetryLogLevel,
  type TelemetryUser,
} from './types';

let initialized = false;
let pendingUser: TelemetryUser | null = null;
let navigationIntegration: ReturnType<
  typeof Sentry.reactNavigationIntegration
> | null = null;

export function initTelemetry(options: InitTelemetryOptions) {
  const dsn = options.dsn?.trim();
  if (!dsn || initialized) {
    return;
  }

  navigationIntegration = Sentry.reactNavigationIntegration({
    enableTimeToInitialDisplay: true,
  });

  Sentry.init({
    dsn,
    environment: options.environment,
    tracesSampleRate: options.tracesSampleRate ?? 1,
    sendDefaultPii: false,
    integrations: [navigationIntegration, Sentry.mobileReplayIntegration()],
    enableLogs: true,
    logsOrigin: 'js',
    enableAutoConsoleLogs: false,
    beforeSendLog: log => {
      if (!__DEV__ && (log.level === 'trace' || log.level === 'debug')) {
        return null;
      }
      return log;
    },
    profilesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
  });

  initialized = true;
  if (pendingUser) {
    Sentry.setUser(pendingUser);
  }
  queueMicrotask(() => {
    void Sentry.flush();
  });
}

export function wrapRoot(Component: ComponentType) {
  if (!initialized) {
    return Component;
  }
  return Sentry.wrap(Component as ComponentType<Record<string, unknown>>);
}

export function captureException(error: unknown) {
  if (!initialized) {
    return;
  }
  Sentry.captureException(error);
  void Sentry.flush();
}

export function log(
  level: TelemetryLogLevel,
  message: string,
  attributes?: TelemetryLogAttributes,
) {
  if (!initialized) {
    return;
  }
  sentryLogger[level](message, attributes);
}

export function setUser(user: TelemetryUser) {
  pendingUser = user;
  if (initialized) {
    Sentry.setUser({ id: user.id, email: user.email });
  }
}

export function clearUser() {
  pendingUser = null;
  if (initialized) {
    Sentry.setUser(null);
  }
}

export function registerNavigationContainer(ref: unknown) {
  navigationIntegration?.registerNavigationContainer(ref);
}

export function onNavigationStateChange(state?: unknown) {
  if (!initialized) {
    return;
  }
  const name = getActiveRouteName(state);
  if (name) {
    Sentry.setTag('route', name);
  }
}

export function TelemetryErrorBoundary({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
