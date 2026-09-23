import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, useNavigationTheme, RootStacks } from '@ds/navigation';
import { onNavigationStateChange } from '@ds/telemetry';
import { WebShell } from '../shell/WebShell';

export function RootNavigator() {
  const navTheme = useNavigationTheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onStateChange={onNavigationStateChange}
    >
      <WebShell>
        <RootStacks />
      </WebShell>
    </NavigationContainer>
  );
}
