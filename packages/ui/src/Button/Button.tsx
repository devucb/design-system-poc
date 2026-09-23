import { Pressable, type ViewStyle } from 'react-native';
import { haptic as hapticNative } from '@ds/native';
import { Box } from '../Box/Box';
import { BaseText } from '../Text/Text';
import type { ButtonProps, ButtonVariant } from './Button.props';

const stretch: ViewStyle = { alignSelf: 'stretch' };

const backgroundColor = {
  primary: '$buttonPrimaryBackground',
  secondary: '$buttonSecondaryBackground',
  transparent: '$buttonTransparent',
  disabled: '$buttonDisabledBackground',
} as const;

const textColor: Record<ButtonVariant, string> = {
  primary: 'buttonPrimaryText',
  secondary: 'buttonSecondaryText',
  transparent: 'buttonPrimaryBackground',
  disabled: 'buttonDisabledText',
};

/**
 * Figma Button. Label color uses button/* tokens, never text/*.
 * Fills the parent because Section / Container stretch children.
 */
export function Button({
  variant = 'primary',
  children,
  onPress,
  padding = '$md',
  haptic,
  ...pressable
}: ButtonProps) {
  const disabled = variant === 'disabled';

  return (
    <Pressable
      {...pressable}
      onPress={event => {
        haptic ? hapticNative(haptic) : undefined;
        onPress?.(event);
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={stretch}
    >
      <Box
        backgroundColor={backgroundColor[variant]}
        padding={padding}
        borderRadius="$md"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <BaseText variant="heading" color={textColor[variant]}>
          {children}
        </BaseText>
      </Box>
    </Pressable>
  );
}
