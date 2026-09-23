import type {PressableProps} from 'react-native';
import type { SpaceToken } from '@ds/theme';

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
  /** Button label. Always rendered as Text. Color comes from button/* tokens. */
  children: string;
  /** Inner padding token. Default `$md`. */
  padding?: SpaceToken;

  haptic?: 'selection' | 'impact'
};
