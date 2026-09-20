import { Text as TamaguiText } from 'tamagui';
import type {
  TextColor,
  TextProps as PublicTextProps,
  TextVariant,
} from './Text.props';

export type TextProps = PublicTextProps;

type TokenColor =
  | '$textPrimary'
  | '$textSecondary'
  | '$buttonPrimaryText'
  | '$buttonSecondaryText'
  | '$buttonPrimaryBackground'
  | '$buttonDisabledText';

function resolveColor(color: TextColor): TokenColor {
  return color === 'secondary' ? '$textSecondary' : '$textPrimary';
}

/**
 * Figma Text: variant Heading | SemiBold | Medium, color Primary | Secondary.
 * Size, weight, and lineHeight come from the Tamagui font tokens.
 */
export function Text({
  variant = 'heading',
  color = 'primary',
  ...rest
}: TextProps) {
  return <TokenText variant={variant} color={resolveColor(color)} {...rest} />;
}

/** Token-colored text for catalog internals (Button labels use button/*). */
export function BaseText({
  variant = 'heading',
  color,
  children,
}: {
  variant?: PublicTextProps['variant'];
  color: string;
  children: PublicTextProps['children'];
}) {
  return (
    <TokenText variant={variant} color={`$${color}` as TokenColor}>
      {children}
    </TokenText>
  );
}

function TokenText({
  variant = 'heading',
  color,
  children,
  textAlign,
}: {
  variant?: TextVariant;
  color: TokenColor;
  children?: PublicTextProps['children'];
  textAlign?: PublicTextProps['textAlign'];
}) {
  switch (variant) {
    case 'semiBold':
      return (
        <TamaguiText
          fontFamily="$body"
          fontSize="$semiBold"
          lineHeight="$semiBold"
          fontWeight="$semiBold"
          color={color}
          textAlign={textAlign}
        >
          {children}
        </TamaguiText>
      );
    case 'medium':
      return (
        <TamaguiText
          fontFamily="$body"
          fontSize="$medium"
          lineHeight="$medium"
          fontWeight="$medium"
          color={color}
          textAlign={textAlign}
        >
          {children}
        </TamaguiText>
      );
    default:
      return (
        <TamaguiText
          fontFamily="$heading"
          fontSize="$true"
          lineHeight="$true"
          fontWeight="$true"
          color={color}
          textAlign={textAlign}
        >
          {children}
        </TamaguiText>
      );
  }
}
