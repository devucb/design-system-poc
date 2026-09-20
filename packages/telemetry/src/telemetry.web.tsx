import * as Sentry from '@sentry/react';
import { logger as sentryLogger } from '@sentry/react';
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

export function initTelemetry(options: InitTelemetryOptions) {
  const dsn = options.dsn?.trim();
  if (!dsn || initialized) {
    return;
  }

  Sentry.init({
    dsn,
    environment: options.environment,
    tracesSampleRate: options.tracesSampleRate ?? 1,
    sendDefaultPii: false,
    enableLogs: true,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
    ],
    beforeSendLog: log => {
      if (log.level === 'trace' || log.level === 'debug') {
        return null;
      }
      return log;
    },
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
  });

  initialized = true;
  if (pendingUser) {
    Sentry.setUser({ id: pendingUser.id, email: pendingUser.email });
  }
  queueMicrotask(() => {
    void Sentry.flush();
  });
}

export function wrapRoot(Component: ComponentType) {
  return Component;
}

export function captureException(error: unknown) {
  if (!initialized) {
    return;
  }
  Sentry.captureException(error);
  void Sentry.flush();
}

export function getRootErrorHandlers() {
  return {
    onUncaughtError: Sentry.reactErrorHandler(),
    onCaughtError: Sentry.reactErrorHandler(),
    onRecoverableError: Sentry.reactErrorHandler(),
  };
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

export function registerNavigationContainer(_ref: unknown) {}

export function onNavigationStateChange(state?: unknown) {
  if (!initialized) {
    return;
  }
  const name = getActiveRouteName(state);
  if (name) {
    Sentry.setTag('route', name);
    Sentry.addBreadcrumb({
      category: 'navigation',
      type: 'navigation',
      message: name,
    });
  }
}

function ErrorFallback() {
  return (
    <pre
      style={{
        whiteSpace: 'pre-wrap',
        padding: 16,
        fontFamily: 'monospace',
      }}
    >
      Something went wrong.
    </pre>
  );
}

export function TelemetryErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
