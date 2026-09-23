import {
  nativeItemExtent,
  slideGap,
  snapOffset,
  visibleCount,
  webPeekRatio,
  webViewportHeight,
} from './SliderCarousel.layout';

describe('SliderCarousel.layout', () => {
  it('shows one large item and two medium items', () => {
    expect(visibleCount('large')).toBe(1);
    expect(visibleCount('medium')).toBe(2);
  });

  it('sizes native items to fill the viewport', () => {
    expect(nativeItemExtent(200, 'large')).toBe(200);
    expect(nativeItemExtent(200, 'medium')).toBe((200 - slideGap) / 2);
  });

  it('leaves a larger web footer peek for medium items', () => {
    const item = 80;
    const largeView = webViewportHeight(item, 'large');
    const mediumView = webViewportHeight(item, 'medium');
    const largePeek = largeView - item;
    const mediumPeek = mediumView - item * 2 - slideGap;
    expect(largePeek / item).toBeCloseTo(webPeekRatio('large'));
    expect(mediumPeek / item).toBeCloseTo(webPeekRatio('medium'));
    expect(mediumPeek / item).toBeGreaterThan(largePeek / item);
  });

  it('snaps from the start of each item', () => {
    expect(snapOffset(100, 0)).toBe(0);
    expect(snapOffset(100, 2)).toBe(200 + slideGap * 2);
  });
});
