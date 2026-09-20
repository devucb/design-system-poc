import { styled, View } from 'tamagui';
import type { BoxProps } from './Box.props';

const BoxFrame = styled(View, {
  name: 'Box',
});

/**
 * Layout primitive. Spacing and color props are design-system tokens
 * (`$md`, `$cardBackground`). Raw px / hex are a type error.
 */
export function Box(props: BoxProps) {
  return <BoxFrame {...props} />;
}
