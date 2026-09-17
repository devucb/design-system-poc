import {Pressable} from 'react-native';
import {Box} from '@components/Box/Box';
import {BaseText} from '@components/Text/Text';
import {Theme} from '@theme/theme';
import {buttonStyles as styles} from './Button.styles';
import type {ButtonProps, ButtonVariant} from './Button.props';

const backgroundColor: Record<ButtonVariant, keyof Theme['colors']> = {
  primary: 'buttonPrimaryBackground',
  secondary: 'buttonSecondaryBackground',
  transparent: 'buttonTransparent',
  disabled: 'buttonDisabledBackground',
};

const textColor: Record<ButtonVariant, keyof Theme['colors']> = {
  primary: 'buttonPrimaryText',
  secondary: 'buttonSecondaryText',
  transparent: 'buttonPrimaryBackground',
  disabled: 'buttonDisabledText',
};

/**
 * Figma Button. Label color uses button/* tokens, never text/*.
 */
export function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  ...pressable
}: ButtonProps) {
  const disabled = variant === 'disabled';

  return (
    <Pressable
      {...pressable}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{disabled}}
      style={fullWidth ? styles.fullWidth : undefined}>
      <Box
        backgroundColor={backgroundColor[variant]}
        padding="md"
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        width={fullWidth ? '100%' : undefined}>
        <BaseText variant="heading" color={textColor[variant]}>
          {children}
        </BaseText>
      </Box>
    </Pressable>
  );
}
