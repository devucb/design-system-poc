import {useRef} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {useSafeAreaInsets, type Edge} from 'react-native-safe-area-context';
import {Box} from '@components/Box/Box';
import {containerStyles as styles} from './Container.styles';
import type {ContainerProps} from './Container.props';

/**
 * Screen shell (Figma Container).
 * Content fills leftover height. Footer hugs the bottom.
 * Horizontal gutter is spacing/lg. Top inset belongs to Header when present.
 */
export function Container({
  children,
  footer,
  scroll = false,
  useSafeArea = true,
  edges = ['top', 'bottom'],
  keyboard = true,
}: ContainerProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTop(scrollRef);

  const inset = (edge: Edge) =>
    useSafeArea && edges.includes(edge) ? insets[edge] : 0;

  const bottomInset = inset('bottom');
  const bodyPadding = {paddingBottom: footer ? 0 : bottomInset};
  const footerPadding = {paddingBottom: bottomInset};
  const shellPadding = {
    paddingTop: inset('top'),
    paddingLeft: inset('left'),
    paddingRight: inset('right'),
  };
  const scrollContent = {
    flexGrow: 1,
    paddingBottom: footer ? 0 : bottomInset,
  };

  const body = scroll ? (
    <ScrollView
      ref={scrollRef}
      style={styles.flex}
      contentContainerStyle={scrollContent}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <Box flex={1} width="100%" style={bodyPadding}>
      {children}
    </Box>
  );

  const column = (
    <Box flex={1} width="100%" paddingHorizontal="lg">
      {body}
      {footer ? (
        <Box width="100%" paddingTop="mdl" style={footerPadding}>
          {footer}
        </Box>
      ) : null}
    </Box>
  );

  return (
    <Box
      flex={1}
      width="100%"
      backgroundColor="backgroundBase"
      style={shellPadding}>
      {keyboard ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {column}
        </KeyboardAvoidingView>
      ) : (
        column
      )}
    </Box>
  );
}
