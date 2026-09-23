import { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';
import { useTheme } from 'tamagui';
import { radius } from '@ds/theme';
import { Box } from '../Box/Box';
import type { SheetProps } from './Sheet.props';

export function SheetProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * Web catalog Sheet: right-side drawer. Not gorhom.
 * The drawer is always full height, so `size` changes nothing here.
 */
export function Sheet({
  open,
  onOpenChange,
  children,
  padding,
  backgroundColor = '$backgroundBase',
}: SheetProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  if (!open) {
    return null;
  }

  const panelWidth = width > 1023 ? Math.round(width * 0.38) : Math.round(width * 0.86);

  return (
    <Box pointerEvents="box-none" style={host}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={() => onOpenChange(false)}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: theme.textPrimary?.val, opacity: 0.4 },
        ]}
      />
      <Box
        padding={padding}
        backgroundColor={backgroundColor}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: panelWidth,
          borderTopLeftRadius: radius.xl,
          borderBottomLeftRadius: radius.xl,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const host = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1000,
} as unknown as ViewStyle;
