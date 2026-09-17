import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Box} from '@components/Box/Box';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {Theme} from '@theme/theme';
import type {TextFieldProps} from './TextField.props';


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
  const theme = useTheme<Theme>();

  return (
    <Section gap="sm">
      <Text variant="semiBold" color="primary">
        {label}
      </Text>
      <Box
        backgroundColor="cardBackground"
        borderRadius="md"
        overflow="hidden"
        width="100%">
        <TextInput
          ref={ref}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          accessibilityLabel={accessibilityLabel ?? label}
          style={{
            color: theme.colors.textPrimary,
            fontFamily: theme.textVariants.medium.fontFamily,
            fontSize: theme.textVariants.medium.fontSize,
            lineHeight: theme.textVariants.medium.lineHeight,
            padding: theme.spacing.md,
          }}
        />
      </Box>
    </Section>
  );
}
