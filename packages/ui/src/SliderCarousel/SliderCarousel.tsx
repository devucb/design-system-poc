import { useState } from 'react';
import {
  FlatList,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
} from 'react-native';
import { Box } from '../Box/Box';
import { nativeItemExtent, snapOffset } from './SliderCarousel.layout';
import type { SliderCarouselProps } from './SliderCarousel.props';

type Size = { width: number; height: number };

function SliderSeparator() {
  return <Box width="$sm" />;
}

/** Native catalog carousel. Horizontal paging via FlatList. */
export function SliderCarousel<T>({
  items,
  variant = 'large',
  keyExtractor,
  renderItem,
  accessibilityLabel,
}: SliderCarouselProps<T>) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const itemWidth = nativeItemExtent(size.width, variant);
  const offsets = items.map((_, index) => snapOffset(itemWidth, index));

  function onLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setSize(prev => {
      if (prev.width === width && prev.height === height) {
        return prev;
      }
      return { width, height };
    });
  }

  function renderSlide({ item, index }: ListRenderItemInfo<T>) {
    return (
      <Box style={{ width: itemWidth, height: size.height }}>
        {renderItem({ item, index })}
      </Box>
    );
  }

  return (
    <Box
      alignSelf="stretch"
      flexGrow={1}
      onLayout={onLayout}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
    >
      {size.width > 0 && size.height > 0 ? (
        <FlatList
          data={items}
          extraData={itemWidth}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToOffsets={offsets}
          disableIntervalMomentum
          keyExtractor={keyExtractor}
          renderItem={renderSlide}
          ItemSeparatorComponent={SliderSeparator}
          style={{ width: size.width, height: size.height }}
        />
      ) : null}
    </Box>
  );
}
