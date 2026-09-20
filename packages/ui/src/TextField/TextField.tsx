import { TextInput } from 'react-native';
import { useTheme } from 'tamagui';
import { FontFamily } from '@ds/theme/fonts';
import { Box } from '../Box/Box';
import { Section } from '../Section/Section';
import { Text } from '../Text/Text';
import type { TextFieldProps } from './TextField.props';

/**
 * Credential field used on Login / Register. Uncontrolled: native owns the
 * text, so typing never re-renders the screen.
 * Colors, radius, and padding come from theme tokens. Not a Figma component yet.
 */
export function TextField({
  label,
  defaultValue,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  autoCorrect = false,
  accessibilityLabel,
  ref,
}: TextFieldProps) {
  const theme = useTheme();
  const textPrimary = String(theme.textPrimary?.val ?? theme.textPrimary);
  const textSecondary = String(theme.textSecondary?.val ?? theme.textSecondary);
  const inputStyle = {
    color: textPrimary,
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    padding: 0,
  };

  return (
    <Section gap="$sm">
      <Text variant="semiBold" color="primary">
        {label}
      </Text>
      <Box
        backgroundColor="$cardBackground"
        borderRadius="$md"
        overflow="hidden"
        padding="$md"
      >
        <TextInput
          ref={ref}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          accessibilityLabel={accessibilityLabel ?? label}
          style={inputStyle}
        />
      </Box>
    </Section>
  );
}
