import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackNavigationHeader } from '../chrome/NavigationHeader';
import { SecureScreenName } from '../config/enums';
import { secureScreensOnPlatform } from '../config/screenDefinitions';
import type { SecureStackParamList } from '../config/types';
import { SecureTabNavigator } from './SecureTabNavigator';

const Stack = createNativeStackNavigator<SecureStackParamList>();

export function SecureStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <StackNavigationHeader {...props} />,
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
            headerShown: screen.headerShown,
            title: screen.titleKey ? t(screen.titleKey) : undefined,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
