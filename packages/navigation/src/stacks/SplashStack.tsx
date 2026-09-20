import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {splashScreensOnPlatform} from '../config/screenDefinitions';
import type {SplashStackParamList} from '../config/types';

const Stack = createNativeStackNavigator<SplashStackParamList>();

export function SplashStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      {splashScreensOnPlatform().map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}
