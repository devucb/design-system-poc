import NativeAppEnv from './NativeAppEnv';

export type AppEnv = 'dev' | 'staging' | 'prod';

function normalize(value?: string): AppEnv {
  return value === 'dev' || value === 'staging' ? value : 'prod';
}

/**
 * Flavor of the installed app: iOS reads the `APP_ENV` Info.plist key
 * (`$(APP_ENV)` from the Xcode configuration), Android reads the `APP_ENV`
 * manifest meta-data (the product flavor's `manifestPlaceholders`).
 * This is the app's own identity, so it stays correct no matter which Metro
 * served the bundle.
 */
export const appEnv: AppEnv = normalize(NativeAppEnv?.getAppEnv());
