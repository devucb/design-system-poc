import { useState } from 'react';
import { Platform, Pressable } from 'react-native';
import DateTimePickerNative from '@react-native-community/datetimepicker';
import { Box } from '../../Box/Box';
import { Section } from '../../Section/Section';
import { Sheet } from '../../Sheet/Sheet';
import { Text } from '../../Text/Text';
import type { DateTimePickerProps } from './DateTimePicker.props';
import { formatDateTime } from './format';

/**
 * Labeled date / time field. Native uses
 * `@react-native-community/datetimepicker` (iOS sheet, Android dialog).
 */
export function DateTimePicker({
  label,
  value,
  onChange,
  mode = 'date',
  placeholder,
  error,
  minimumDate,
  maximumDate,
  testID,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const pickerMode =
    mode === 'datetime' && Platform.OS !== 'ios' ? 'date' : mode;

  function commit(next?: Date) {
    if (next) {
      onChange(next);
    }
    if (Platform.OS === 'android') {
      setOpen(false);
    }
  }

  const picker = open ? (
    <DateTimePickerNative
      value={value ?? new Date()}
      mode={pickerMode}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      onChange={(_, next) => commit(next)}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  ) : null;

  return (
    <Section gap="$sm">
      <Text variant="semiBold" color="primary">
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        testID={testID}
        onPress={() => setOpen(true)}
      >
        <Box
          backgroundColor="$cardBackground"
          borderRadius="$md"
          padding="$md"
        >
          <Text variant="medium" color={value ? 'primary' : 'secondary'}>
            {value ? formatDateTime(value, mode) : placeholder ?? label}
          </Text>
        </Box>
      </Pressable>
      {error ? (
        <Text variant="medium" color="secondary">
          {error}
        </Text>
      ) : null}
      {Platform.OS === 'ios' ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <Box padding="$lg">{picker}</Box>
        </Sheet>
      ) : (
        picker
      )}
    </Section>
  );
}
