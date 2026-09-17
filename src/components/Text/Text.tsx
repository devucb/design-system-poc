import type {ComponentProps} from 'react';
import {createText} from '@shopify/restyle';
import {Theme} from '@theme/theme';
import type {TextColor, TextProps as PublicTextProps} from './Text.props';

export type TextProps = PublicTextProps &
  Omit<
    ComponentProps<ReturnType<typeof createText<Theme>>>,
    | 'fontSize'
    | 'fontWeight'
    | 'lineHeight'
    | 'fontFamily'
    | 'letterSpacing'
    | 'variant'
    | 'color'
  >;

export const BaseText = createText<Theme>();

function resolveColor(color: TextColor): keyof Theme['colors'] {
  return color === 'secondary' ? 'textSecondary' : 'textPrimary';
}

/**
 * Figma Text: variant Heading | SemiBold | Medium, color Primary | Secondary.
 * fontSize / weight / lineHeight are not part of the public API.
 */
export function Text({
  variant = 'heading',
  color = 'primary',
  ...rest
}: TextProps) {
  return <BaseText variant={variant} color={resolveColor(color)} {...rest} />;
}
