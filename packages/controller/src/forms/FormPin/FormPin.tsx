import { Controller, useFormContext } from 'react-hook-form';
import { Pin, type PinProps } from '@ds/ui';
import type { FormFieldProps } from '../Form.props';

export function FormPin({ name, ...props }: FormFieldProps<PinProps>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Pin
          {...props}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
