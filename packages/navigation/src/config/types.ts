import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {
  NonSecureScreenName,
  SecureScreenName,
  SecureTabName,
  SplashScreenName,
  StackName,
} from './enums';

export type SplashStackParamList = {
  [SplashScreenName.Splash]: undefined;
};

export type NonSecureStackParamList = {
  [NonSecureScreenName.Login]: undefined;
  [NonSecureScreenName.Register]: undefined;
};

export type SecureTabParamList = {
  [SecureTabName.Home]: undefined;
  [SecureTabName.Explore]: undefined;
  [SecureTabName.Activity]: undefined;
  [SecureTabName.Profile]: undefined;
};

export type SecureStackParamList = {
  [SecureScreenName.Tabs]: NavigatorScreenParams<SecureTabParamList>;
  [SecureScreenName.Notifications]: undefined;
  [SecureScreenName.Wallet]: undefined;
  [SecureScreenName.Support]: undefined;
};

export type RootStackParamList = {
  [StackName.Splash]: NavigatorScreenParams<SplashStackParamList>;
  [StackName.NonSecure]: NavigatorScreenParams<NonSecureStackParamList>;
  [StackName.Secure]: NavigatorScreenParams<SecureStackParamList>;
};

export type SplashStackScreenProps<T extends keyof SplashStackParamList> =
  NativeStackScreenProps<SplashStackParamList, T>;

export type NonSecureStackScreenProps<T extends keyof NonSecureStackParamList> =
  NativeStackScreenProps<NonSecureStackParamList, T>;

export type SecureStackScreenProps<T extends keyof SecureStackParamList> =
  NativeStackScreenProps<SecureStackParamList, T>;

export type SecureTabScreenProps<T extends keyof SecureTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SecureTabParamList, T>,
    NativeStackScreenProps<SecureStackParamList>
  >;
