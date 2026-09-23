import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useThemePreference } from '@ds/theme';
import { navigationRef, useNavigationTheme, RootStacks } from '@ds/navigation';
import { onNavigationStateChange, registerNavigationContainer } from '@ds/telemetry';

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
