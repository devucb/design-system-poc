/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_ENV: string;
  readonly GRAPHQL_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly SENTRY_TRACES_SAMPLE_RATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
