import { createContext, useContext } from 'react';
import {
  FormProvider,
  useForm,
  type FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDateTimePicker } from './FormDateTimePicker/FormDateTimePicker';
import { FormSelect } from './FormSelect/FormSelect';
import { FormPin } from './FormPin/FormPin';
import { FormTckn } from './FormTckn/FormTckn';
import { FormTextField } from './FormTextField/FormTextField';
import type { FormProps } from './Form.props';

const SubmitContext = createContext<(() => void) | null>(null);

export function useFormSubmit() {
  const submit = useContext(SubmitContext);
  if (!submit) {
    throw new Error('useFormSubmit must be used inside Form');
  }
  return submit;
}

export function FormRoot<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormProps<T>) {
  const methods = useForm<T>({
    // yupResolver generics don't line up cleanly with FieldValues + AnyObjectSchema.
    resolver: yupResolver(schema) as never,
    defaultValues,
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <SubmitContext.Provider value={() => void methods.handleSubmit(onSubmit)()}>
        {children}
      </SubmitContext.Provider>
    </FormProvider>
  );
}

export const Form = Object.assign(FormRoot, {
  TextField: FormTextField,
  Select: FormSelect,
  DateTimePicker: FormDateTimePicker,
  Pin: FormPin,
  Tckn: FormTckn,
});
