import { signIn } from '@ds/session/authStore';
import { Login } from '@ds/views/Login/Login';
import { NonSecureScreenName } from '../config/enums';
import type { NonSecureStackScreenProps } from '../config/types';

export function LoginScreen({
  navigation,
}: NonSecureStackScreenProps<typeof NonSecureScreenName.Login>) {
  return (
    <Login
      onSignIn={signIn}
      onRegister={() => navigation.navigate(NonSecureScreenName.Register)}
    />
  );
}
