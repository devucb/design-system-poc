import { Controller, useFormContext } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@ds/ui';
import type { FormFieldProps } from '../Form.props';

export function FormTextField({
  name,
  ...props
}: FormFieldProps<TextFieldProps>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          value={field.value ?? ''}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
