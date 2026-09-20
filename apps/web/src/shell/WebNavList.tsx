import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'tamagui';
import { Box } from '@ds/ui/Box/Box';
import { Icon } from '@ds/ui/Icon/Icon';
import { Text } from '@ds/ui/Text/Text';
import { navigateToTab } from '@ds/navigation/chrome/navigationRef';
import type { SecureTabName } from '@ds/navigation/config/enums';
import { tabDestinations } from '@ds/navigation/config/tabConfig';

export function WebNavList({
  activeTab,
  collapsed = false,
  onNavigate,
}: {
  activeTab: SecureTabName | null;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const idle = theme.textSecondary!.val;
  const active = theme.buttonPrimaryBackground!.val;

  return (
    <Box paddingHorizontal="$sm" gap="$sm">
      {tabDestinations().map(screen => {
        const selected = screen.name === activeTab;
        const icons = screen.icon;
        if (!icons) {
          return null;
        }
        const label = screen.titleKey
          ? t(screen.tabLabelKey ?? screen.titleKey)
          : screen.name;
        return (
          <Pressable
            key={screen.name}
            accessibilityRole="menuitem"
            accessibilityLabel={label}
            accessibilityState={{ selected }}
            onPress={() => {
              navigateToTab(screen.name);
              onNavigate?.();
            }}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent={collapsed ? 'center' : 'flex-start'}
              gap="$sm"
              padding="$sm"
              borderRadius="$md"
              backgroundColor={selected ? '$cardBackground' : undefined}
            >
              <Icon
                name={selected ? icons.focused : icons.idle}
                color={selected ? active : idle}
                size={20}
              />
              {collapsed ? null : (
                <Box flex={1}>
                  <Text
                    variant="semiBold"
                    color={selected ? 'primary' : 'secondary'}
                  >
                    {label}
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
}
