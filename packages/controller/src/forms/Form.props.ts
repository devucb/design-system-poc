import type { ReactNode } from 'react';
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

export type FormProps<T extends FieldValues> = {
  schema: AnyObjectSchema;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
};

/**
 * Props every `Form.*` field owns itself — the field reads them from the form
 * state, so callers never pass them.
 */
export type ControlledProps =
  | 'value'
  | 'onChange'
  | 'onChangeText'
  | 'onBlur'
  | 'error';

/** A catalog input `P` bound to the schema key `name`. */
export type FormFieldProps<P> = { name: string } & Omit<P, ControlledProps>;
