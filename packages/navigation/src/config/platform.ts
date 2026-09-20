import {Platform} from 'react-native';

export type AppPlatform = 'native' | 'web';

export const appPlatform: AppPlatform = Platform.OS === 'web' ? 'web' : 'native';

export function forPlatform<
  T extends {name: string; platforms?: readonly AppPlatform[]},
>(screens: readonly T[]): T[] {
  return screens.filter(
    screen => !screen.platforms || screen.platforms.includes(appPlatform),
  );
}
