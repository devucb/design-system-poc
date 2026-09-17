import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import {StatusBar} from 'react-native';
import {useAuth} from '@auth/AuthProvider';
import {useBootstrap} from '@bootstrap/BootstrapProvider';
import {useThemePreference} from '@theme/ThemePreferenceProvider';
import {Theme} from '@theme/theme';
import {NonSecureStackNavigator} from './NonSecureStack';
import {SecureStackNavigator} from './SecureStack';
import {SplashStackNavigator} from './SplashStack';

export function RootNavigator() {
  const {session} = useAuth();
  const {hasCompletedSplash} = useBootstrap();
  const restyle = useTheme<Theme>();
  const {resolvedScheme} = useThemePreference();

  const base = resolvedScheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: restyle.colors.backgroundBase,
      card: restyle.colors.cardBackground,
      text: restyle.colors.textPrimary,
      primary: restyle.colors.buttonPrimaryBackground,
      border: restyle.colors.cardBackground,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {!hasCompletedSplash ? (
        <SplashStackNavigator />
      ) : session ? (
        <SecureStackNavigator />
      ) : (
        <NonSecureStackNavigator />
      )}
      <StatusBar
        barStyle={resolvedScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </NavigationContainer>
  );
}
