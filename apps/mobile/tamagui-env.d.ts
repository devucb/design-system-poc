import type { AppConfig } from '@ds/theme';

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
