import {Register} from '@ds/views';
import {NonSecureScreenName} from '../config/enums';
import type {NonSecureStackScreenProps} from '../config/types';

export function RegisterScreen({
  navigation,
}: NonSecureStackScreenProps<typeof NonSecureScreenName.Register>) {
  return (
    <Register onLogin={() => navigation.navigate(NonSecureScreenName.Login)} />
  );
}
