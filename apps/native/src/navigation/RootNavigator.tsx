import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useThemePreference } from '@ds/theme/themePreference';
import { navigationRef } from '@ds/navigation/chrome/navigationRef';
import { useNavigationTheme } from '@ds/navigation/chrome/useNavigationTheme';
import { RootStacks } from '@ds/navigation/stacks/RootStacks';
import {
  onNavigationStateChange,
  registerNavigationContainer,
} from '@ds/telemetry/telemetry';

export function RootNavigator() {
  const { resolvedScheme } = useThemePreference();
  const navTheme = useNavigationTheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={() => {
        registerNavigationContainer(navigationRef);
      }}
      onStateChange={onNavigationStateChange}
    >
      <RootStacks />
      <StatusBar
        barStyle={resolvedScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </NavigationContainer>
  );
}
