import type {AppConfig} from '@ds/theme/tamagui.config';

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
