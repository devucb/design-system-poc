import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@ds/navigation/chrome/navigationRef';
import { useNavigationTheme } from '@ds/navigation/chrome/useNavigationTheme';
import { RootStacks } from '@ds/navigation/stacks/RootStacks';
import { onNavigationStateChange } from '@ds/telemetry/telemetry';
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
