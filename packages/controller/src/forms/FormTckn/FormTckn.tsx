import { Controller, useFormContext } from 'react-hook-form';
import { Tckn, type TcknProps } from '@ds/ui';
import type { FormFieldProps } from '../Form.props';

export function FormTckn({ name, ...props }: FormFieldProps<TcknProps>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Tckn
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
