import * as yup from 'yup';
import { isValidTckn } from './tckn';

export const tcknSchema = yup
  .string()
  .required()
  .test('tckn', 'Enter a valid TCKN', value =>
    value ? isValidTckn(value) : false,
  );

export function pinSchema(length = 6) {
  return yup
    .string()
    .required()
    .matches(new RegExp(`^\\d{${length}}$`), `Enter ${length} digits`);
}

export const emailSchema = yup.string().required().email();

export const passwordSchema = yup.string().required().min(1);
