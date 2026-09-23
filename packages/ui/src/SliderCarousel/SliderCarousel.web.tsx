import { useState } from 'react';
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { Box } from '../Box/Box';
import { webViewportHeight } from './SliderCarousel.layout';
import type { SliderCarouselProps } from './SliderCarousel.props';

/** Web catalog carousel. Vertical snap-scroll with a footer peek of the next item. */
export function SliderCarousel<T>({
  items,
  variant = 'large',
  keyExtractor,
  renderItem,
  accessibilityLabel,
}: SliderCarouselProps<T>) {
  const [itemHeight, setItemHeight] = useState(0);
  const viewportHeight =
    itemHeight > 0 ? webViewportHeight(itemHeight, variant) : undefined;

  function onFirstItemLayout(event: LayoutChangeEvent) {
    const height = event.nativeEvent.layout.height;
    setItemHeight(prev => (prev === height || height <= 0 ? prev : height));
  }

  return (
    <Box
      alignSelf="stretch"
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        {...({ onWheel: stopStoryScroll } as object)}
        style={[viewport, viewportHeight ? { height: viewportHeight } : null]}
      >
        <Box flexDirection="column" gap="$sm">
          {items.map((item, index) => (
            <View
              key={keyExtractor(item)}
              onLayout={index === 0 ? onFirstItemLayout : undefined}
              style={slide}
            >
              {renderItem({ item, index })}
            </View>
          ))}
        </Box>
      </View>
    </Box>
  );
}

function stopStoryScroll(event: { stopPropagation: () => void }) {
  event.stopPropagation();
}

const viewport = {
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
  scrollSnapType: 'y mandatory',
} as unknown as ViewStyle;

const slide = {
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
} as unknown as ViewStyle;
