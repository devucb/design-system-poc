import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { Box } from '../Box/Box';
import { containerStyles as styles } from './Container.styles';
import type { ContainerProps } from './Container.props';

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
}: ContainerProps) {
  const insets = useSafeAreaInsets();

  const inset = (edge: Edge) =>
    useSafeArea && edges.includes(edge) ? insets[edge] : 0;

  const bottomInset = inset('bottom');
  const scrollBottomInset = footer ? 0 : bottomInset;
  const bodyPadding = { paddingBottom: footer ? 0 : bottomInset };
  const footerPadding = { paddingBottom: bottomInset };
  const shellPadding = {
    paddingTop: inset('top'),
    paddingLeft: inset('left'),
    paddingRight: inset('right'),
  };
  // iOS: contentInset avoids a layout pass when the home indicator changes.
  // Android ignores contentInset, so keep paddingBottom there.
  const scrollContent =
    Platform.OS === 'android'
      ? [styles.scrollGrow, { paddingBottom: scrollBottomInset }]
      : styles.scrollGrow;
  const scrollInsets =
    Platform.OS === 'ios' ? { bottom: scrollBottomInset } : undefined;

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
    <Box flex={1} style={bodyPadding}>
      {children}
    </Box>
  );

  const column = (
    <Box flex={1} paddingHorizontal="$lg">
      {top ? <Box>{top}</Box> : null}
      {body}
      {footer ? <Box style={footerPadding}>{footer}</Box> : null}
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="$backgroundBase" style={shellPadding}>
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
