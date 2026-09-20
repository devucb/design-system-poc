import type {Ref} from 'react';
import type {KeyboardTypeOptions, TextInput} from 'react-native';

export type TextFieldProps = {
  /** Visible label above the field. Uses Text semiBold + primary. */
  label: string;
  /**
   * Initial value only. The field is uncontrolled so native owns the text and
   * keystrokes do not re-render the screen. Read the value via onChangeText.
   */
  defaultValue?: string;
  /** Called on every keystroke. */
  onChangeText: (value: string) => void;
  /** Placeholder shown when the value is empty. */
  placeholder?: string;
  /** Masks input (passwords). */
  secureTextEntry?: boolean;
  /** Keyboard type. Defaults to default. */
  keyboardType?: KeyboardTypeOptions;
  /** Capitalization behavior. Defaults to none for credentials. */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Disables autocorrect. Defaults to true for credentials. */
  autoCorrect?: boolean;
  /** Accessibility label override. Falls back to `label`. */
  accessibilityLabel?: string;
  /** Escape hatch for imperative control such as `clear()` or `focus()`. */
  ref?: Ref<TextInput>;
};
