import type { Ref } from 'react';
import type { KeyboardTypeOptions, TextInput } from 'react-native';

export type TextFieldProps = {
  /** Visible label above the field. Uses Text semiBold + primary. */
  label: string;
  /**
   * Controlled value. Prefer this inside Form; native still owns the cursor.
   * Omit and use `defaultValue` for a one-shot uncontrolled field.
   */
  value?: string;
  /**
   * Initial value only when `value` is omitted.
   */
  defaultValue?: string;
  /** Called on every keystroke. */
  onChangeText: (value: string) => void;
  onBlur?: () => void;
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
  maxLength?: number;
  editable?: boolean;
  /** Validation message under the field. */
  error?: string;
  /** Accessibility label override. Falls back to `label`. */
  accessibilityLabel?: string;
  testID?: string;
  /** Escape hatch for imperative control such as `clear()` or `focus()`. */
  ref?: Ref<TextInput>;
};
