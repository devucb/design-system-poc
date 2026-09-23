import type { ReactElement } from 'react';

export type SliderCarouselVariant = 'large' | 'medium';

export type SliderCarouselRenderItemInfo<T> = {
  item: T;
  index: number;
};

export type SliderCarouselProps<T> = {
  items: T[];
  /**
   * `large` shows one item. `medium` shows two.
   * Native is horizontal. Web is vertical with a footer peek of the next item.
   */
  variant?: SliderCarouselVariant;
  keyExtractor: (item: T) => string;
  renderItem: (info: SliderCarouselRenderItemInfo<T>) => ReactElement | null;
  accessibilityLabel?: string;
};
