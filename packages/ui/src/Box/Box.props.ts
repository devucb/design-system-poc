import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import type { ColorToken, RadiusToken, SpaceToken } from '@ds/theme';

export type BoxProps = {
  children?: ReactNode;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center';
  overflow?: 'visible' | 'hidden' | 'scroll';
  padding?: SpaceToken;
  paddingTop?: SpaceToken;
  paddingBottom?: SpaceToken;
  paddingLeft?: SpaceToken;
  paddingRight?: SpaceToken;
  paddingHorizontal?: SpaceToken;
  paddingVertical?: SpaceToken;
  margin?: SpaceToken;
  marginTop?: SpaceToken;
  marginBottom?: SpaceToken;
  marginLeft?: SpaceToken;
  marginRight?: SpaceToken;
  marginHorizontal?: SpaceToken;
  marginVertical?: SpaceToken;
  gap?: SpaceToken;
  rowGap?: SpaceToken;
  columnGap?: SpaceToken;
  backgroundColor?: ColorToken;
  borderRadius?: RadiusToken;
  width?: SpaceToken;
  height?: SpaceToken;
  minWidth?: SpaceToken;
  minHeight?: SpaceToken;
  maxWidth?: SpaceToken;
  maxHeight?: SpaceToken;
  /**
   * Device chrome only (safe-area insets, measured widths).
   * Do not put catalog spacing or colors here — use token props.
   */
  style?: StyleProp<ViewStyle>;
} & Pick<
  ViewProps,
  | 'pointerEvents'
  | 'onLayout'
  | 'testID'
  | 'accessibilityRole'
  | 'accessibilityValue'
  | 'accessibilityLabel'
>;
