import type {ReactNode} from 'react';

export type TextColor = 'primary' | 'secondary';
export type TextVariant = 'heading' | 'semiBold' | 'medium';

export type TextProps = {
  /**
   * Figma Text variant. Maps 1:1 to text styles.
   * Heading = Inter Bold 16/24, SemiBold = 12/16/600, Medium = 12/16/500.
   * Do not pass fontSize/fontWeight — those are locked to the variant.
   */
  variant?: TextVariant;
  /**
   * Figma Color property. Primary → text/primary, Secondary → text/secondary.
   * Theme Light/Dark modes swap the resolved hex.
   */
  color?: TextColor;
  /** Layout-only. Not part of type identity; may be overridden per usage. */
  textAlign?: 'left' | 'center' | 'right';
  children?: ReactNode;
};
