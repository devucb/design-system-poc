import {createTheme} from '@shopify/restyle';
import {FontFamily} from './fonts';

/**
 * Figma: https://www.figma.com/design/wgT2dVwUDdO3S6KMAuL6A3/DS-Green
 * Colors collection — Light / Dark modes. Names match Figma 1:1.
 */

const lightTheme = createTheme({
  colors: {
    // background/base
    backgroundBase: '#F4F7F5',
    // text/primary
    textPrimary: '#13241C',
    // text/secondary
    textSecondary: '#5C7268',
    // card/background
    cardBackground: '#E6EEE9',
    // button/primaryBackgroundColor
    buttonPrimaryBackground: '#1F7A4C',
    // button/primaryTextColor
    buttonPrimaryText: '#FFFFFF',
    // button/secondaryBackgroundColor
    buttonSecondaryBackground: '#D7E6DC',
    // button/secondaryTextColor
    buttonSecondaryText: '#1F7A4C',
    // button/transparent
    buttonTransparent: 'transparent',
    // button/disabledBackgroundColor
    buttonDisabledBackground: '#E4EBE6',
    // button/disabledTextColor
    buttonDisabledText: '#8A9B92',
  },
  spacing: {
    none: 0,
    sm: 8,
    mdl: 12,
    md: 16,
    lg: 24,
  },
  borderRadii: {
    md: 8,
    xl: 16,
  },
  textVariants: {
    defaults: {
      fontFamily: FontFamily.bold,
      fontWeight: '700' as const,
      color: 'textPrimary',
    },
    // Text Variant=Heading — Inter Bold 16/24
    heading: {
      fontFamily: FontFamily.bold,
      fontWeight: '700' as const,
      fontSize: 16,
      lineHeight: 24,
    },
    // Text Variant=SemiBold — Inter Semi Bold 12/16
    semiBold: {
      fontFamily: FontFamily.semiBold,
      fontWeight: '600' as const,
      fontSize: 12,
      lineHeight: 16,
    },
    // Text Variant=Medium — Inter Medium 12/16
    medium: {
      fontFamily: FontFamily.medium,
      fontWeight: '500' as const,
      fontSize: 12,
      lineHeight: 16,
    },
  },
  buttonVariants: {
    defaults: {
      padding: 'md',
      borderRadius: 'md',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    primary: {
      backgroundColor: 'buttonPrimaryBackground',
    },
    secondary: {
      backgroundColor: 'buttonSecondaryBackground',
    },
    transparent: {
      backgroundColor: 'buttonTransparent',
    },
    disabled: {
      backgroundColor: 'buttonDisabledBackground',
    },
  } as const,
  card: {
    minHeight: 32,
  },
});

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    backgroundBase: '#0E1511',
    textPrimary: '#E7F0EA',
    textSecondary: '#8FA89B',
    cardBackground: '#18241E',
    buttonPrimaryBackground: '#3EAB6C',
    buttonPrimaryText: '#07110C',
    buttonSecondaryBackground: '#22352C',
    buttonSecondaryText: '#6BC48E',
    buttonTransparent: 'transparent',
    buttonDisabledBackground: '#1A2420',
    buttonDisabledText: '#6B7F75',
  },
};

export const theme = lightTheme;
