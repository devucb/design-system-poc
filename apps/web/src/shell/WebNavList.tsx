import { Pressable } from 'react-native';
import { useTranslation } from '@ds/language';
import { useTheme } from 'tamagui';
import { Box, Icon, Text } from '@ds/ui';
import { navigateToTab, tabDestinations, type SecureTabName } from '@ds/navigation';

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
