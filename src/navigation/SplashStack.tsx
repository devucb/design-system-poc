import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '@screens/Splash/SplashScreen';
import {SplashScreenName} from './enums';
import type {SplashStackParamList} from './types';

const Stack = createNativeStackNavigator<SplashStackParamList>();

export function SplashStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name={SplashScreenName.Splash} component={SplashScreen} />
    </Stack.Navigator>
  );
}
