import type { TextFieldProps } from '../TextField/TextField.props';

export type TcknProps = Omit<
  TextFieldProps,
  'keyboardType' | 'maxLength' | 'autoCapitalize' | 'autoCorrect' | 'secureTextEntry'
>;
