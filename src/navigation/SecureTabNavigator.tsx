import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';
import {ActivityScreen} from '@screens/Activity/ActivityScreen';
import {ExploreScreen} from '@screens/Explore/ExploreScreen';
import {HomeScreen} from '@screens/Home/HomeScreen';
import {ProfileScreen} from '@screens/Profile/ProfileScreen';
import {Theme} from '@theme/theme';
import {SecureTabName} from './enums';
import {TabNavigationHeader} from './NavigationHeader';
import type {SecureTabParamList} from './types';

const Tab = createBottomTabNavigator<SecureTabParamList>();

const TAB_ICON: Record<SecureTabName, {focused: string; idle: string}> = {
  [SecureTabName.Home]: {focused: 'home', idle: 'home-outline'},
  [SecureTabName.Explore]: {focused: 'compass', idle: 'compass-outline'},
  [SecureTabName.Activity]: {focused: 'pulse', idle: 'pulse-outline'},
  [SecureTabName.Profile]: {focused: 'person', idle: 'person-outline'},
};

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
  const icons = TAB_ICON[routeName];
  return (
    <Ionicons
      name={focused ? icons.focused : icons.idle}
      color={color}
      size={size}
    />
  );
}

export function SecureTabNavigator() {
  const {t} = useTranslation();
  const theme = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        header: TabNavigationHeader,
        headerShadowVisible: false,
        tabBarActiveTintColor: theme.colors.buttonPrimaryBackground,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundBase,
          borderTopColor: theme.colors.cardBackground,
        },
        tabBarLabelStyle: {
          fontFamily: theme.textVariants.semiBold.fontFamily,
          fontSize: theme.textVariants.semiBold.fontSize,
          lineHeight: theme.textVariants.semiBold.lineHeight,
        },
        tabBarIcon: ({color, focused, size}) => (
          <TabBarIcon
            routeName={route.name}
            color={color}
            focused={focused}
            size={size}
          />
        ),
      })}>
      <Tab.Screen
        name={SecureTabName.Home}
        component={HomeScreen}
        options={{title: t('tabs.home'), tabBarLabel: t('tabs.home')}}
      />
      <Tab.Screen
        name={SecureTabName.Explore}
        component={ExploreScreen}
        options={{title: t('tabs.explore'), tabBarLabel: t('tabs.explore')}}
      />
      <Tab.Screen
        name={SecureTabName.Activity}
        component={ActivityScreen}
        options={{title: t('tabs.activity'), tabBarLabel: t('tabs.activity')}}
      />
      <Tab.Screen
        name={SecureTabName.Profile}
        component={ProfileScreen}
        options={{title: t('profile.title'), tabBarLabel: t('tabs.profile')}}
      />
    </Tab.Navigator>
  );
}
