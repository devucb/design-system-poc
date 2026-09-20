import type { ReactNode } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import type { ColorToken, SpaceToken } from '@ds/theme/tokens';

export type ContainerProps = {
  /**
   * Middle slot. Always fills leftover height between `top` and `footer`.
   * When `scroll` is true, only this region scrolls.
   */
  children: ReactNode;
  /**
   * Sticky top slot. Hugs its content, stays outside the scroll.
   * Use for in-screen chrome (filters, page title). Not the nav Header.
   * Container does not add gap — space the slot content yourself.
   */
  top?: ReactNode;
  /**
   * Sticky footer slot. Hugs its content, stays outside the scroll.
   * Safe Area bottom inset is applied when this screen owns that edge.
   * Container does not add gap — space the slot content yourself.
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
  /** Screen fill. Default `$backgroundBase`. */
  backgroundColor?: ColorToken;
  /** Token padding on every side of the content column. */
  padding?: SpaceToken;
  /** Horizontal gutter token. Default `$lg`. */
  paddingHorizontal?: SpaceToken;
  /** Vertical token padding for the content column. */
  paddingVertical?: SpaceToken;
  paddingTop?: SpaceToken;
  paddingBottom?: SpaceToken;
};
