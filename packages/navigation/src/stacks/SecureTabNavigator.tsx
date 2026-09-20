import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { FontFamily } from '@ds/theme/fonts';
import { Icon } from '@ds/ui/Icon/Icon';
import { TabNavigationHeader } from '../chrome/NavigationHeader';
import { appPlatform } from '../config/platform';
import { tabScreensOnPlatform } from '../config/screenDefinitions';
import type { SecureTabName } from '../config/enums';
import type { SecureTabParamList } from '../config/types';

const Tab = createBottomTabNavigator<SecureTabParamList>();

function TabBarIcon({
  routeName,
  color,
  focused,
  size,
}: {
  routeName: SecureTabName;
  color: string;
  focused: boolean;
  size: number;
}) {
  const screen = tabScreensOnPlatform().find(entry => entry.name === routeName);
  if (!screen?.icon) {
    return null;
  }
  return (
    <Icon
      name={focused ? screen.icon.focused : screen.icon.idle}
      color={color}
      size={size}
    />
  );
}

export function SecureTabNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();
  const web = appPlatform === 'web';

  return (
    <Tab.Navigator
      {...(web ? { tabBar: () => null } : {})}
      screenOptions={({ route }) => ({
        headerShown: false,
        header: props => <TabNavigationHeader {...props} />,
        headerShadowVisible: false,
        tabBarActiveTintColor: theme.buttonPrimaryBackground!.val,
        tabBarInactiveTintColor: theme.textSecondary!.val,
        tabBarStyle: web
          ? {
              display: 'none',
              height: 0,
              overflow: 'hidden',
              borderTopWidth: 0,
            }
          : {
              backgroundColor: theme.backgroundBase!.val,
              borderTopColor: theme.cardBackground!.val,
            },
        tabBarLabelStyle: {
          fontFamily: FontFamily.semiBold,
          fontSize: 12,
          lineHeight: 16,
        },
        tabBarIcon: ({ color, focused, size }) => (
          <TabBarIcon
            routeName={route.name}
            color={color}
            focused={focused}
            size={size}
          />
        ),
      })}
    >
      {tabScreensOnPlatform().map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            title: screen.titleKey ? t(screen.titleKey) : undefined,
            tabBarLabel: screen.tabLabelKey
              ? t(screen.tabLabelKey)
              : screen.titleKey
              ? t(screen.titleKey)
              : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
