import {signUp} from '@ds/session/authStore';
import {Register} from '@ds/views/Register/Register';
import {NonSecureScreenName} from '../config/enums';
import type {NonSecureStackScreenProps} from '../config/types';

export function RegisterScreen({
  navigation,
}: NonSecureStackScreenProps<typeof NonSecureScreenName.Register>) {
  return (
    <Register
      onSignUp={signUp}
      onLogin={() => navigation.navigate(NonSecureScreenName.Login)}
    />
  );
}
