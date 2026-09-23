import Config from 'react-native-config';

function required(name: string): string {
  const value = Config[name];
  if (value == null || value === '') {
    throw new Error(
      `Missing required environment variable ${name}. Set it in apps/mobile/.env.development, .env.staging, or .env.production (selected with ENVFILE).`,
    );
  }
  return value;
}

/** Public build config from react-native-config. Secrets are not in this object. */
export const env = {
  GRAPHQL_URL: required('GRAPHQL_URL'),
  SENTRY_DSN: Config.SENTRY_DSN ?? '',
  SENTRY_TRACES_SAMPLE_RATE: Config.SENTRY_TRACES_SAMPLE_RATE ?? '',
};
