import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SecureScreenName} from './enums';
import {SecureTabNavigator} from './SecureTabNavigator';
import type {SecureStackParamList} from './types';

const Stack = createNativeStackNavigator<SecureStackParamList>();

export function SecureStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SecureScreenName.Tabs} component={SecureTabNavigator} />
    </Stack.Navigator>
  );
}
