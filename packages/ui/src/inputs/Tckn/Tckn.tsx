import { TextField } from '../TextField/TextField';
import type { TcknProps } from './Tckn.props';

/** 11-digit T.C. kimlik no field. Checksum lives in form/yup, not here. */
export function Tckn({
  onChangeText,
  label,
  ...rest
}: TcknProps) {
  return (
    <TextField
      {...rest}
      label={label}
      keyboardType="number-pad"
      maxLength={11}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={value => {
        onChangeText(value.replace(/\D/g, '').slice(0, 11));
      }}
    />
  );
}
