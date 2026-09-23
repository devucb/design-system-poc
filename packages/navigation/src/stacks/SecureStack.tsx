import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from '@ds/language';
import { StackNavigationHeader } from '../chrome/NavigationHeader';
import { SecureScreenName } from '../config/enums';
import { secureScreensOnPlatform } from '../config/screenDefinitions';
import type { SecureStackParamList } from '../config/types';
import { SecureTabNavigator } from './SecureTabNavigator';
import { Box } from '@ds/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<SecureStackParamList>();

export function SecureStackNavigator() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={SecureScreenName.Tabs}
        component={SecureTabNavigator}
      />
      {secureScreensOnPlatform().map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            header: props => {
              return (
                <Box paddingTop={insets.top}>
                  <StackNavigationHeader {...props} />
                </Box>
              );
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
