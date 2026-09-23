import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker, type DateTimePickerProps } from '@ds/ui';
import type { FormFieldProps } from '../Form.props';

export function FormDateTimePicker({
  name,
  ...props
}: FormFieldProps<DateTimePickerProps>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DateTimePicker
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
