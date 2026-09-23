export type PinProps = {
  label: string;
  length?: number;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  /** Mask digits. */
  secure?: boolean;
};
