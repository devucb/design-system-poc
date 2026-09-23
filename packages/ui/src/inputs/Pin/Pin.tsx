import { useRef } from 'react';
import { Pressable, TextInput } from 'react-native';
import { useTheme } from 'tamagui';
import { FontFamily } from '@ds/theme';
import { Box } from '../../Box/Box';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';
import type { PinProps } from './Pin.props';

const hiddenInput = {
  position: 'absolute' as const,
  opacity: 0,
  height: 1,
  width: 1,
};

/** One-time PIN / OTP. Digits live in a single hidden field. */
export function Pin({
  label,
  length = 6,
  value = '',
  onChange,
  onBlur,
  error,
  secure = false,
}: PinProps) {
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const textPrimary = String(theme.textPrimary?.val ?? theme.textPrimary);
  const cells = [];

  for (let index = 0; index < length; index += 1) {
    const digit = value[index] ?? '';
    cells.push(
      <Box
        key={index}
        flex={1}
        backgroundColor="$cardBackground"
        borderRadius="$md"
        padding="$md"
        alignItems="center"
        justifyContent="center"
      >
        <Text variant="heading" color="primary">
          {digit ? (secure ? '•' : digit) : ' '}
        </Text>
      </Box>,
    );
  }

  return (
    <Section gap="$sm">
      <Text variant="semiBold" color="primary">
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => inputRef.current?.focus()}
      >
        <Box flexDirection="row" alignItems="stretch" gap="$sm">
          {cells}
        </Box>
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={next => {
          onChange(next.replace(/\D/g, '').slice(0, length));
        }}
        onBlur={onBlur}
        keyboardType="number-pad"
        maxLength={length}
        caretHidden
        accessibilityLabel={label}
        style={[hiddenInput, { color: textPrimary, fontFamily: FontFamily.medium }]}
      />
      {error ? (
        <Text variant="medium" color="secondary">
          {error}
        </Text>
      ) : null}
    </Section>
  );
}
