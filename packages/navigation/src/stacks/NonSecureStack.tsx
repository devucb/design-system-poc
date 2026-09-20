import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackNavigationHeader } from '../chrome/NavigationHeader';
import { nonSecureScreensOnPlatform } from '../config/screenDefinitions';
import type { NonSecureStackParamList } from '../config/types';

const Stack = createNativeStackNavigator<NonSecureStackParamList>();

export function NonSecureStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <StackNavigationHeader {...props} />,
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      {nonSecureScreensOnPlatform().map(screen => (
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
