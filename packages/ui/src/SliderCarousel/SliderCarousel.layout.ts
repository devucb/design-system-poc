import { space } from '@ds/theme';
import type { SliderCarouselVariant } from './SliderCarousel.props';

export const slideGap = space.sm;

export function visibleCount(variant: SliderCarouselVariant) {
  return variant === 'medium' ? 2 : 1;
}

/** Fraction of one slide that peeks in the web footer. Medium shows more. */
export function webPeekRatio(variant: SliderCarouselVariant) {
  return variant === 'medium' ? 0.4 : 0.22;
}

export function nativeItemExtent(
  viewport: number,
  variant: SliderCarouselVariant,
) {
  const count = visibleCount(variant);
  return Math.max(0, (viewport - slideGap * (count - 1)) / count);
}

export function webViewportHeight(
  itemExtent: number,
  variant: SliderCarouselVariant,
) {
  const count = visibleCount(variant);
  const peek = itemExtent * webPeekRatio(variant);
  return count * itemExtent + slideGap * (count - 1) + peek;
}

export function snapOffset(itemExtent: number, index: number) {
  return index * (itemExtent + slideGap);
}
