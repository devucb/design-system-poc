import { signOut } from '@ds/session/authStore';
import { Profile } from '@ds/views/Profile/Profile';
import { SecureScreenName, SecureTabName } from '../config/enums';
import type { SecureTabScreenProps } from '../config/types';

export function ProfileScreen({
  navigation,
}: SecureTabScreenProps<typeof SecureTabName.Profile>) {
  return (
    <Profile
      onSignOut={signOut}
      onOpenNotifications={() =>
        navigation.navigate(SecureScreenName.Notifications)
      }
      onOpenWallet={() => navigation.navigate(SecureScreenName.Wallet)}
      onOpenSupport={() => navigation.navigate(SecureScreenName.Support)}
    />
  );
}
