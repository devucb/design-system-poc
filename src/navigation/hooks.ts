import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {
  NonSecureStackParamList,
  SecureStackParamList,
  SecureTabParamList,
  SplashStackParamList,
} from './types';

/** Typed navigation for SplashStack. Screen names come from SplashScreenName. */
export function useSplashNavigation() {
  return useNavigation<NativeStackNavigationProp<SplashStackParamList>>();
}

/** Typed navigation for NonSecureStack (Login / Register). */
export function useNonSecureNavigation() {
  return useNavigation<NativeStackNavigationProp<NonSecureStackParamList>>();
}

/** Typed navigation for SecureStack (tabs + future pushed screens). */
export function useSecureNavigation() {
  return useNavigation<NativeStackNavigationProp<SecureStackParamList>>();
}

/** Typed navigation for the 4 secure tabs. */
export function useSecureTabNavigation() {
  return useNavigation<BottomTabNavigationProp<SecureTabParamList>>();
}
