import { createFont, createTamagui, createTokens } from 'tamagui';
import { FontFamily } from './fonts';
import { darkColors, lightColors, radius, space } from './tokens';

const headingFont = createFont({
  family: FontFamily.bold,
  size: {
    heading: 16,
    true: 16,
  },
  lineHeight: {
    heading: 24,
    true: 24,
  },
  weight: {
    heading: '700',
    true: '700',
  },
  letterSpacing: {
    heading: 0,
    true: 0,
  },
  face: {
    700: { normal: FontFamily.bold },
  },
});

const bodyFont = createFont({
  family: FontFamily.medium,
  size: {
    true: 12,
    medium: 12,
    semiBold: 12,
  },
  lineHeight: {
    true: 16,
    medium: 16,
    semiBold: 16,
  },
  weight: {
    true: '500',
    medium: '500',
    semiBold: '600',
  },
  letterSpacing: {
    true: 0,
    medium: 0,
    semiBold: 0,
  },
  face: {
    500: { normal: FontFamily.medium },
    600: { normal: FontFamily.semiBold },
  },
});

const tokens = createTokens({
  color: {
    ...lightColors,
  },
  space,
  size: {
    ...space,
  },
  radius,
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
  },
});

const config = createTamagui({
  tokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    light: {
      ...lightColors,
    },
    dark: {
      ...darkColors,
    },
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
  },
  settings: {
    // Token-backed props (space, size, color, radius, zIndex) only accept
    // design-system tokens. Raw px / hex / named CSS colors are a type error.
    allowedStyleValues: 'strict',
    autocompleteSpecificTokens: 'except-special',
  },
});

export default config;

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
