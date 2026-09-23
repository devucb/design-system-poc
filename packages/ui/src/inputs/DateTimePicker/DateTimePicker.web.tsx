import { FontFamily } from '@ds/theme';
import { useTheme } from 'tamagui';
import { Box } from '../../Box/Box';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';
import type { DateTimePickerProps } from './DateTimePicker.props';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function toInputValue(value: Date, mode: DateTimePickerProps['mode']) {
  const year = value.getFullYear();
  const month = pad(value.getMonth() + 1);
  const day = pad(value.getDate());
  const hours = pad(value.getHours());
  const minutes = pad(value.getMinutes());
  if (mode === 'time') {
    return `${hours}:${minutes}`;
  }
  if (mode === 'datetime') {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  return `${year}-${month}-${day}`;
}

function parseInput(value: string, mode: DateTimePickerProps['mode']) {
  if (mode === 'time') {
    const [hours, minutes] = value.split(':').map(Number);
    const next = new Date();
    next.setHours(hours, minutes, 0, 0);
    return next;
  }
  return new Date(value);
}

function inputType(mode: DateTimePickerProps['mode']) {
  if (mode === 'time') {
    return 'time';
  }
  if (mode === 'datetime') {
    return 'datetime-local';
  }
  return 'date';
}

/**
 * Web catalog DateTimePicker: native date / time input. Not the community
 * picker — that module is native-only.
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
  const theme = useTheme();
  const textPrimary = String(theme.textPrimary?.val ?? theme.textPrimary);
  const inputStyle = {
    color: textPrimary,
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    padding: 0,
    width: '100%',
    border: 'none',
    background: 'transparent',
    outline: 'none',
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
        <input
          type={inputType(mode)}
          value={value ? toInputValue(value, mode) : ''}
          placeholder={placeholder}
          min={minimumDate ? toInputValue(minimumDate, mode) : undefined}
          max={maximumDate ? toInputValue(maximumDate, mode) : undefined}
          aria-label={label}
          data-testid={testID}
          onChange={event => {
            const next = event.target.value;
            if (!next) {
              return;
            }
            onChange(parseInput(next, mode));
          }}
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
