import type { ReactElement } from 'react';
import type { SpaceToken } from '@ds/theme';

export type ListRenderItemInfo<T> = {
  item: T;
  index: number;
};

export type ListProps<T> = {
  data: T[];
  /** Stable row identity. Required — recycling and scroll anchoring need it. */
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: ListRenderItemInfo<T>) => ReactElement | null;
  /**
   * Recycling pool per row shape. Pass it when rows are heterogeneous so a
   * header row never recycles into a card row.
   */
  itemType?: (item: T, index: number) => string;
  /** Gap between rows (columns when `horizontal`). */
  gap?: SpaceToken;
  /** Inset around the rows. Scroll content keeps moving under it. */
  padding?: SpaceToken;
  header?: ReactElement;
  footer?: ReactElement;
  empty?: ReactElement;
  horizontal?: boolean;
  /** Grid columns. Rows are equal height unless `masonry`. */
  columns?: number;
  masonry?: boolean;
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  /** Anything outside `data` that `renderItem` reads. */
  extraData?: unknown;
  /** Set when the list is the scrollable body of a catalog Sheet. */
  sheet?: boolean;
  accessibilityLabel?: string;
};
