import type { ComponentType } from 'react';
import type { ScrollViewProps, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { space, type SpaceToken, type SpacingKey } from '@ds/theme';
import { Box } from '../Box/Box';
import { SheetScrollView } from './sheetScroll';
import type { ListProps } from './List.props';

function createGap(size: SpaceToken, horizontal: boolean) {
  return function ListGap() {
    return horizontal ? <Box width={size} /> : <Box height={size} />;
  };
}

function createInset(size: SpacingKey): ViewStyle {
  return { padding: space[size] };
}

/** Separators and content insets are built once — recycling wants stable props. */
const rowGaps: Record<SpaceToken, ComponentType> = {
  $none: createGap('$none', false),
  $sm: createGap('$sm', false),
  $mdl: createGap('$mdl', false),
  $md: createGap('$md', false),
  $lg: createGap('$lg', false),
};

const columnGaps: Record<SpaceToken, ComponentType> = {
  $none: createGap('$none', true),
  $sm: createGap('$sm', true),
  $mdl: createGap('$mdl', true),
  $md: createGap('$md', true),
  $lg: createGap('$lg', true),
};

const contentInsets: Record<SpaceToken, ViewStyle> = {
  $none: createInset('none'),
  $sm: createInset('sm'),
  $mdl: createInset('mdl'),
  $md: createInset('md'),
  $lg: createInset('lg'),
};

const fill = { flex: 1 } as const;

/**
 * Virtualized list (FlashList). Only the visible window mounts, so this is the
 * catalog default for any data-driven list — one file for native and web.
 * The host has to bound it (`flex` or a height); rows size themselves.
 */
export function List<T>({
  data,
  keyExtractor,
  renderItem,
  itemType,
  gap,
  padding,
  header,
  footer,
  empty,
  horizontal = false,
  columns,
  masonry,
  onEndReached,
  refreshing,
  onRefresh,
  extraData,
  sheet = false,
  accessibilityLabel,
}: ListProps<T>) {
  const gaps = horizontal ? columnGaps : rowGaps;

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemType={itemType}
      ItemSeparatorComponent={gap ? gaps[gap] : undefined}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      contentContainerStyle={padding ? contentInsets[padding] : undefined}
      horizontal={horizontal}
      numColumns={columns}
      masonry={masonry}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      extraData={extraData}
      renderScrollComponent={
        sheet
          ? (SheetScrollView as ComponentType<ScrollViewProps> | undefined)
          : undefined
      }
      style={fill}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      accessibilityLabel={accessibilityLabel}
    />
  );
}
