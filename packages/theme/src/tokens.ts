/**
 * Figma: https://www.figma.com/design/wgT2dVwUDdO3S6KMAuL6A3/DS-Green
 * Color names match the Figma collection 1:1.
 */
export const lightColors = {
  backgroundBase: '#F4F7F5',
  textPrimary: '#13241C',
  textSecondary: '#5C7268',
  cardBackground: '#E6EEE9',
  buttonPrimaryBackground: '#1F7A4C',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondaryBackground: '#D7E6DC',
  buttonSecondaryText: '#1F7A4C',
  buttonTransparent: 'transparent',
  buttonDisabledBackground: '#E4EBE6',
  buttonDisabledText: '#8A9B92',
} as const;

export const darkColors = {
  backgroundBase: '#0E1511',
  textPrimary: '#E7F0AA',
  textSecondary: '#8FA89B',
  cardBackground: '#18241E',
  buttonPrimaryBackground: '#3EAB6C',
  buttonPrimaryText: '#07110C',
  buttonSecondaryBackground: '#22352C',
  buttonSecondaryText: '#6BC48E',
  buttonTransparent: 'transparent',
  buttonDisabledBackground: '#1A2420',
  buttonDisabledText: '#6B7F75',
} as const;

export const space = {
  0: 0,
  none: 0,
  sm: 8,
  mdl: 12,
  md: 16,
  lg: 24,
  true: 16,
} as const;

export const radius = {
  0: 0,
  md: 8,
  xl: 16,
  true: 8,
} as const;

export type SpacingKey = 'none' | 'sm' | 'mdl' | 'md' | 'lg';

/** Tamagui space token. Pass `$md`, never a raw px like `12`. */
export type SpaceToken = `$${SpacingKey}`;

export type ColorName = keyof typeof lightColors;

/** Tamagui theme color token. Pass `$cardBackground`, never a hex. */
export type ColorToken = `$${ColorName}`;

export type RadiusKey = 'md' | 'xl';

/** Tamagui radius token. Pass `$md`, never a raw px. */
export type RadiusToken = `$${RadiusKey}`;
