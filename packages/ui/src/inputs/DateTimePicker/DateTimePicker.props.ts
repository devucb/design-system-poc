export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export type DateTimePickerProps = {
  label: string;
  value?: Date;
  onChange: (value: Date) => void;
  mode?: DateTimePickerMode;
  placeholder?: string;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  testID?: string;
};
