import { useEffect, useRef, type ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useTheme } from 'tamagui';
import { radius, type ColorName } from '@ds/theme';
import { Box } from '../Box/Box';
import type { SheetProps } from './Sheet.props';

function Backdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  );
}

export function SheetProvider({ children }: { children: ReactNode }) {
  return <BottomSheetModalProvider>{children}</BottomSheetModalProvider>;
}

function SheetBody({
  padding,
  fill,
  children,
}: Pick<SheetProps, 'padding' | 'children'> & { fill: boolean }) {
  if (!padding) {
    return children;
  }
  return (
    <Box padding={padding} flex={fill ? 1 : undefined}>
      {children}
    </Box>
  );
}

/** A `large` sheet stops just short of the top so the backdrop stays tappable. */
const largeSnapPoints = ['85%'];
const fillStyle = { flex: 1 } as const;

/** Native catalog Sheet: gorhom modal, opens from the bottom. */
export function Sheet({
  open,
  onOpenChange,
  children,
  padding,
  backgroundColor = '$backgroundBase',
  size = 'content',
}: SheetProps) {
  const ref = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const fill = theme[backgroundColor.slice(1) as ColorName]?.val;

  useEffect(() => {
    if (!open) {
      return;
    }
    const id = requestAnimationFrame(() => {
      ref.current?.present();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) {
    return null;
  }

  const large = size === 'large';

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={!large}
      snapPoints={large ? largeSnapPoints : undefined}
      bottomInset={insets.bottom}
      enablePanDownToClose
      onDismiss={() => onOpenChange(false)}
      backdropComponent={Backdrop}
      backgroundStyle={{
        backgroundColor: fill,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
      }}
      handleIndicatorStyle={{ backgroundColor: theme.textSecondary?.val }}
    >
      <BottomSheetView style={large ? fillStyle : undefined}>
        <SheetBody padding={padding} fill={large}>
          {children}
        </SheetBody>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
