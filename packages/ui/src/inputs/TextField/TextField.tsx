import { TextInput } from 'react-native';
import { useTheme } from 'tamagui';
import { FontFamily } from '@ds/theme';
import { Box } from '../../Box/Box';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';
import type { TextFieldProps } from './TextField.props';

/**
 * Labeled text input. Colors, radius, and padding come from theme tokens.
 */
export function TextField({
  label,
  value,
  defaultValue,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  editable,
  error,
  accessibilityLabel,
  testID,
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
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          editable={editable}
          accessibilityLabel={accessibilityLabel ?? label}
          testID={testID}
          style={inputStyle}
        />
      </Box>
      {error ? (
        <Text variant="medium" color="secondary">
          {error}
        </Text>
      ) : null}
    </Section>
  );
}
