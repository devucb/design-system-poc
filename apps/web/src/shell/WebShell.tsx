import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from '@ds/language';
import { useTheme } from 'tamagui';
import { useSession, useHasCompletedSplash } from '@ds/store';
import { space } from '@ds/theme';
import { Box, Icon } from '@ds/ui';
import { getFocusedTabName, navigationRef } from '@ds/navigation';
import { WebNavList } from './WebNavList';
import {
  DESKTOP_CONTENT_MAX_WIDTH,
  getWebLayout,
  MOBILE_MENU_ROW,
  RAIL_COLLAPSED,
  RAIL_EXPANDED,
} from './webLayout';

function useActiveTab() {
  const [activeTab, setActiveTab] =
    useState<ReturnType<typeof getFocusedTabName>>(null);

  useEffect(() => {
    const sync = () => {
      if (!navigationRef.isReady()) {
        return;
      }
      setActiveTab(getFocusedTabName(navigationRef.getRootState()));
    };

    sync();
    return navigationRef.addListener('state', sync);
  }, []);

  return activeTab;
}

function MenuToggle({
  open,
  onPress,
  color,
}: {
  open: boolean;
  onPress: () => void;
  color: string;
}) {
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={open ? t('common.closeMenu') : t('common.menu')}
      hitSlop={space.sm}
    >
      <Icon name="menu" color={color} size={24} />
    </Pressable>
  );
}

function SideRail({
  open,
  onToggle,
  onNavigate,
  activeTab,
  iconColor,
  topInset,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  activeTab: ReturnType<typeof getFocusedTabName>;
  iconColor: string;
  topInset: number;
}) {
  return (
    <Box
      backgroundColor="$backgroundBase"
      style={{
        paddingTop: topInset,
        width: open ? RAIL_EXPANDED : RAIL_COLLAPSED,
      }}
    >
      <Box paddingHorizontal="$md" paddingVertical="$md">
        <MenuToggle open={open} onPress={onToggle} color={iconColor} />
      </Box>
      <WebNavList
        activeTab={activeTab}
        collapsed={!open}
        onNavigate={onNavigate}
      />
    </Box>
  );
}

function MobileTopMenu({
  open,
  onToggle,
  onNavigate,
  activeTab,
  iconColor,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  activeTab: ReturnType<typeof getFocusedTabName>;
  iconColor: string;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Box
      backgroundColor="$backgroundBase"
      pointerEvents="auto"
      style={{ paddingTop: insets.top }}
    >
      <Box paddingHorizontal="$md" paddingVertical="$sm">
        <MenuToggle open={open} onPress={onToggle} color={iconColor} />
      </Box>
      {open ? (
        <Box paddingBottom="$sm">
          <WebNavList activeTab={activeTab} onNavigate={onNavigate} />
        </Box>
      ) : null}
    </Box>
  );
}

function ContentPane({
  desktop,
  children,
}: {
  desktop: boolean;
  children: ReactNode;
}) {
  return (
    <Box flex={1} backgroundColor="$cardBackground">
      <Box
        flex={1}
        backgroundColor="$backgroundBase"
        style={desktop ? styles.desktopContent : undefined}
      >
        {children}
      </Box>
    </Box>
  );
}

function WebShellLayout({ children }: { children: ReactNode }) {
  const { width } = useWindowDimensions();
  const layout = getWebLayout(width);
  const session = useSession();
  const hasCompletedSplash = useHasCompletedSplash();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeTab = useActiveTab();
  const showMenu = Boolean(session) && hasCompletedSplash;
  const iconColor = theme.textPrimary!.val;

  const onToggle = () => {
    setMenuOpen(open => !open);
  };

  const onNavigate = () => {
    setMenuOpen(false);
  };

  const app = children;

  if (layout === 'mobile') {
    if (!showMenu) {
      return <Box flex={1}>{app}</Box>;
    }
    return (
      <Box flex={1} backgroundColor="$backgroundBase">
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width, height: 0 },
            insets: {
              top: insets.top + MOBILE_MENU_ROW,
              bottom: insets.bottom,
              left: insets.left,
              right: insets.right,
            },
          }}
        >
          <Box flex={1}>{app}</Box>
        </SafeAreaProvider>
        <Box style={styles.mobileMenuOverlay} pointerEvents="box-none">
          <MobileTopMenu
            open={menuOpen}
            onToggle={onToggle}
            onNavigate={onNavigate}
            activeTab={activeTab}
            iconColor={iconColor}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} flexDirection="row" backgroundColor="$cardBackground">
      {showMenu ? (
        <SideRail
          open={menuOpen}
          onToggle={onToggle}
          onNavigate={onNavigate}
          activeTab={activeTab}
          iconColor={iconColor}
          topInset={insets.top}
        />
      ) : null}
      <ContentPane desktop={layout === 'desktop'}>{app}</ContentPane>
    </Box>
  );
}

export function WebShell({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider
      style={styles.flex}
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <WebShellLayout>{children}</WebShellLayout>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  desktopContent: {
    maxWidth: DESKTOP_CONTENT_MAX_WIDTH,
  },
  mobileMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});
