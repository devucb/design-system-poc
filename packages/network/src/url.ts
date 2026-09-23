import { Platform } from 'react-native';

export function defaultGraphqlUrl(fromEnv?: string) {
  if (fromEnv) {
    return fromEnv;
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:4000/graphql';
  }
  return 'http://192.168.1.104:4000/graphql';
}
