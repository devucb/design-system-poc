import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {LoginScreen} from '@screens/Login/LoginScreen';
import {RegisterScreen} from '@screens/Register/RegisterScreen';
import {NonSecureScreenName} from './enums';
import {StackNavigationHeader} from './NavigationHeader';
import type {NonSecureStackParamList} from './types';

const Stack = createNativeStackNavigator<NonSecureStackParamList>();

export function NonSecureStackNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: StackNavigationHeader,
        headerShadowVisible: false,
      }}>
      <Stack.Screen name={NonSecureScreenName.Login} component={LoginScreen} />
      <Stack.Screen
        name={NonSecureScreenName.Register}
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: t('auth.registerTitle'),
        }}
      />
    </Stack.Navigator>
  );
}
