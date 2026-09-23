export type BreadcrumbItem = {
  label: string;
  onPress?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  accessibilityLabel?: string;
  testID?: string;
};
