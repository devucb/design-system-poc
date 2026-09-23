import {Login} from '@ds/views';
import {NonSecureScreenName} from '../config/enums';
import type {NonSecureStackScreenProps} from '../config/types';

export function LoginScreen({
  navigation,
}: NonSecureStackScreenProps<typeof NonSecureScreenName.Login>) {
  return (
    <Login
      onRegister={() => navigation.navigate(NonSecureScreenName.Register)}
    />
  );
}
