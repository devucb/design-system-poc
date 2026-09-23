import { Controller, useFormContext } from 'react-hook-form';
import { Select, type SelectProps } from '@ds/ui';
import type { FormFieldProps } from '../Form.props';

export function FormSelect<T>({
  name,
  ...props
}: FormFieldProps<SelectProps<T>>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
