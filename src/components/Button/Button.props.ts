import type {ReactNode} from 'react';
import type {PressableProps} from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'disabled';

export type ButtonProps = Omit<
  PressableProps,
  'children' | 'disabled' | 'style'
> & {
  /**
   * Figma Background × TextColor pair.
   * Primary/Secondary match the component set. Transparent and Disabled
   * exist in tokens even if Disabled is not currently a Figma variant.
   */
  variant?: ButtonVariant;
  /**
   * Figma Fill container. When true, width is 100%.
   * Omit for Hug contents.
   */
  fullWidth?: boolean;
  /** Button label. Color comes from button/* tokens, never text/*. */
  children: ReactNode;
};
