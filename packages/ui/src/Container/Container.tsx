import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { space, type SpaceToken, type SpacingKey } from '@ds/theme';
import { Box } from '../Box/Box';
import { containerStyles as styles } from './Container.styles';
import type { ContainerProps } from './Container.props';

function px(token?: SpaceToken) {
  return token ? space[token.slice(1) as SpacingKey] : 0;
}

/**
 * Screen shell (Figma Container). Three rows:
 * `top` hugs and stays put, `children` grow (and optionally scroll),
 * `footer` hugs and stays put. Horizontal gutter is spacing/lg.
 * Catalog Header is a separate component — it is not this `top` slot.
 */
export function Container({
  children,
  top,
  footer,
  scroll = false,
  useSafeArea = true,
  edges = ['top', 'bottom'],
  keyboard = true,
  backgroundColor = '$backgroundBase',
  padding,
  paddingHorizontal = '$lg',
  paddingVertical,
  paddingTop,
  paddingBottom,
}: ContainerProps) {
  const insets = useSafeAreaInsets();

  const inset = (edge: Edge) =>
    useSafeArea && edges.includes(edge) ? insets[edge] : 0;

  const gutter = padding ?? paddingHorizontal;
  const contentTop = px(paddingTop ?? paddingVertical ?? padding);
  const contentBottom = px(paddingBottom ?? paddingVertical ?? padding);
  // A footer owns the bottom edge once it is there.
  const safeBottom = footer ? 0 : inset('bottom');
  const footerPadding = { paddingBottom: inset('bottom') };
  const shellPadding = {
    paddingTop: inset('top'),
    paddingLeft: inset('left'),
    paddingRight: inset('right'),
  };
  // iOS: contentInset avoids a layout pass when the home indicator changes.
  // Android ignores contentInset, so keep the inset in paddingBottom there.
  const scrollContent = [
    styles.scrollGrow,
    {
      paddingTop: contentTop,
      paddingBottom:
        contentBottom + (Platform.OS === 'android' ? safeBottom : 0),
    },
  ];
  const scrollInsets =
    Platform.OS === 'ios' ? { bottom: safeBottom } : undefined;

  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={scrollContent}
      contentInsetAdjustmentBehavior="never"
      contentInset={scrollInsets}
      scrollIndicatorInsets={scrollInsets}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <Box
      flex={1}
      style={{
        paddingTop: contentTop,
        paddingBottom: contentBottom + safeBottom,
      }}
    >
      {children}
    </Box>
  );

  const column = (
    <Box flex={1} paddingHorizontal={gutter}>
      {top ? <Box>{top}</Box> : null}
      {body}
      {footer ? <Box style={footerPadding}>{footer}</Box> : null}
    </Box>
  );

  return (
    <Box flex={1} backgroundColor={backgroundColor} style={shellPadding}>
      {keyboard ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {column}
        </KeyboardAvoidingView>
      ) : (
        column
      )}
    </Box>
  );
}
