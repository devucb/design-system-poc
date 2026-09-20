import type { ComponentType } from 'react';
import type { IconName } from '@ds/ui/Icon/Icon.props';
import {
  NonSecureScreenName,
  SecureScreenName,
  SecureTabName,
  SplashScreenName,
} from './enums';
import type { AppPlatform } from './platform';
import { forPlatform } from './platform';
import { ActivityScreen } from '../screens/ActivityScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SupportScreen } from '../screens/SupportScreen';
import { WalletScreen } from '../screens/WalletScreen';

/**
 * One entry per route. Stacks map this list — do not add another
 * `<Stack.Screen>` by hand.
 *
 * Web-only: `platforms: ['web']`. Native-only: `platforms: ['native']`.
 * Same route, different UI: add `Foo.web.tsx` next to the view
 * (`packages/views/Foo/Foo.tsx`). Metro / Vite pick it up.
 */
export type ScreenDefinition<Name extends string = string> = {
  name: Name;
  component: ComponentType<any>;
  titleKey?:
    | 'tabs.home'
    | 'tabs.explore'
    | 'tabs.activity'
    | 'tabs.profile'
    | 'profile.title'
    | 'auth.registerTitle'
    | 'notifications.title'
    | 'wallet.title'
    | 'support.title';
  tabLabelKey?: 'tabs.home' | 'tabs.explore' | 'tabs.activity' | 'tabs.profile';
  headerShown?: boolean;
  icon?: { focused: IconName; idle: IconName };
  platforms?: readonly AppPlatform[];
};

export const splashScreens: ScreenDefinition<SplashScreenName>[] = [
  {
    name: SplashScreenName.Splash,
    component: SplashScreen,
  },
];

export const nonSecureScreens: ScreenDefinition<NonSecureScreenName>[] = [
  {
    name: NonSecureScreenName.Login,
    component: LoginScreen,
    headerShown: false,
  },
  {
    name: NonSecureScreenName.Register,
    component: RegisterScreen,
    titleKey: 'auth.registerTitle',
    headerShown: true,
  },
];

export const secureScreens: ScreenDefinition<
  Exclude<SecureScreenName, typeof SecureScreenName.Tabs>
>[] = [
  {
    name: SecureScreenName.Notifications,
    component: NotificationsScreen,
    titleKey: 'notifications.title',
    headerShown: true,
  },
  {
    name: SecureScreenName.Wallet,
    component: WalletScreen,
    titleKey: 'wallet.title',
    headerShown: true,
  },
  {
    name: SecureScreenName.Support,
    component: SupportScreen,
    titleKey: 'support.title',
    headerShown: true,
  },
];

export const tabScreens: ScreenDefinition<SecureTabName>[] = [
  {
    name: SecureTabName.Home,
    component: HomeScreen,
    titleKey: 'tabs.home',
    icon: { focused: 'home', idle: 'home-outline' },
    headerShown: false,
  },
  {
    name: SecureTabName.Explore,
    component: ExploreScreen,
    titleKey: 'tabs.explore',
    icon: { focused: 'explore', idle: 'explore-outline' },
    headerShown: false,
  },
  {
    name: SecureTabName.Activity,
    component: ActivityScreen,
    titleKey: 'tabs.activity',
    icon: { focused: 'activity', idle: 'activity-outline' },
    headerShown: false,
  },
  {
    name: SecureTabName.Profile,
    component: ProfileScreen,
    titleKey: 'profile.title',
    tabLabelKey: 'tabs.profile',
    icon: { focused: 'profile', idle: 'profile-outline' },
    headerShown: false,
  },
];

export function splashScreensOnPlatform() {
  return forPlatform(splashScreens);
}

export function nonSecureScreensOnPlatform() {
  return forPlatform(nonSecureScreens);
}

export function tabScreensOnPlatform() {
  return forPlatform(tabScreens);
}

export function secureScreensOnPlatform() {
  return forPlatform(secureScreens);
}
