import type { ReactElement } from 'react';

export type SelectRenderItemInfo<T> = {
  item: T;
  index: number;
  selected: boolean;
  onSelect: () => void;
};

export type SelectProps<T> = {
  label: string;
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  renderItem?: (info: SelectRenderItemInfo<T>) => ReactElement | null;
  placeholder?: string;
  error?: string;
  testID?: string;
};
