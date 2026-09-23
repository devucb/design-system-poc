export type AppEnv = 'dev' | 'staging' | 'prod';

// Vite replaces this exact expression at build time (apps/web/vite.config.ts).
const fromVite: string | undefined = import.meta.env.APP_ENV;

export const appEnv: AppEnv =
  fromVite === 'dev' || fromVite === 'staging'
    ? fromVite
    : 'prod';
