import { useState } from 'react';
import { Pressable, type LayoutChangeEvent } from 'react-native';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import type { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.props';

const ELLIPSIS = '.....';

type Slot =
  | { kind: 'crumb'; item: BreadcrumbItem; last: boolean }
  | { kind: 'ellipsis' };

function slotsFor(items: BreadcrumbItem[], collapse: boolean): Slot[] {
  if (!collapse || items.length <= 3) {
    return items.map((item, index) => ({
      kind: 'crumb',
      item,
      last: index === items.length - 1,
    }));
  }
  return [
    { kind: 'crumb', item: items[0], last: false },
    { kind: 'ellipsis' },
    { kind: 'crumb', item: items[items.length - 2], last: false },
    { kind: 'crumb', item: items[items.length - 1], last: true },
  ];
}

/**
 * Web header trail: `aa / bb / cc`. When the row overflows it collapses
 * to `aa / ..... / xx / yy` (first + last two).
 */
export function Breadcrumbs({
  items,
  accessibilityLabel,
  testID,
}: BreadcrumbsProps) {
  const [rowWidth, setRowWidth] = useState<number | undefined>(undefined);
  const [contentWidth, setContentWidth] = useState<number | undefined>(
    undefined,
  );
  const collapse =
    rowWidth !== undefined &&
    contentWidth !== undefined &&
    contentWidth > rowWidth;
  const slots = slotsFor(items, collapse);

  function onRowLayout(event: LayoutChangeEvent) {
    const width = event.nativeEvent.layout.width;
    setRowWidth(prev => {
      if (prev === width) {
        return prev;
      }
      setContentWidth(undefined);
      return width;
    });
  }

  function onContentLayout(event: LayoutChangeEvent) {
    if (collapse) {
      return;
    }
    const width = event.nativeEvent.layout.width;
    setContentWidth(prev => (prev === width ? prev : width));
  }

  return (
    <Box
      onLayout={onRowLayout}
      overflow="hidden"
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        gap="$sm"
        onLayout={onContentLayout}
      >
        {slots.map((slot, index) => {
          const prefix =
            index === 0 ? null : (
              <Text variant="medium" color="secondary">
                /
              </Text>
            );
          if (slot.kind === 'ellipsis') {
            return (
              <Box key="ellipsis" flexDirection="row" alignItems="center" gap="$sm">
                {prefix}
                <Text variant="medium" color="secondary">
                  {ELLIPSIS}
                </Text>
              </Box>
            );
          }
          const { item, last } = slot;
          const label = (
            <Text variant={last ? 'heading' : 'medium'} color="primary">
              {item.label}
            </Text>
          );
          return (
            <Box
              key={`${item.label}-${index}`}
              flexDirection="row"
              alignItems="center"
              gap="$sm"
            >
              {prefix}
              {item.onPress && !last ? (
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel={item.label}
                  onPress={item.onPress}
                >
                  {label}
                </Pressable>
              ) : (
                label
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
