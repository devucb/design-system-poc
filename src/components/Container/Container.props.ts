import type {ReactNode} from 'react';
import type {Edge} from 'react-native-safe-area-context';

export type ContainerProps = {
  /** Content slot. Fills leftover height above the footer. */
  children: ReactNode;
  /**
   * Footer slot. Pinned below content, outside the scroll.
   * Sits above the home indicator when this screen owns the bottom edge.
   */
  footer?: ReactNode;
  /**
   * Scroll the content slot. Keep false when a child is already a list
   * (FlatList / SectionList) to avoid nested vertical scrollers.
   */
  scroll?: boolean;
  /**
   * Whether this screen owns Safe Area insets. Default true.
   * False when Header and/or a tab bar already consumed the edges.
   */
  useSafeArea?: boolean;
  /**
   * Which edges to inset when useSafeArea is true. Insets come from
   * `useSafeAreaInsets`, so only the listed edges get padding.
   * No Header: `['top', 'bottom']`.
   * Header owns top: `['bottom']`.
   * Header + tab bar: skip Safe Area (`useSafeArea={false}`).
   */
  edges?: Edge[];
  /**
   * Lift footer above the keyboard on iOS. Android uses window adjustResize.
   */
  keyboard?: boolean;
};
