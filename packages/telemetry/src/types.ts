export type TelemetryUser = {
  id: string;
  email?: string;
};

export type TelemetryLogLevel = 'info' | 'warn' | 'error';

export type TelemetryLogAttributes = Record<string, string | number | boolean>;

export type InitTelemetryOptions = {
  /** Empty / missing DSN disables Sentry (Storybook, tests, local). */
  dsn?: string;
  environment?: string;
  tracesSampleRate?: number;
};

type NavRoute = {
  name?: string;
  state?: unknown;
};

type NavState = {
  index?: number;
  routes?: NavRoute[];
};

function asNavState(state: unknown): NavState | undefined {
  if (!state || typeof state !== 'object') {
    return undefined;
  }
  return state as NavState;
}

export function getActiveRouteName(state?: unknown): string | undefined {
  const nav = asNavState(state);
  if (!nav?.routes?.length) {
    return undefined;
  }
  const route = nav.routes[nav.index ?? 0] ?? nav.routes[0];
  if (route?.state) {
    return getActiveRouteName(route.state);
  }
  return route?.name;
}
