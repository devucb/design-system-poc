import { Home } from '@ds/views';
import { SecureScreenName, SecureTabName } from '../config/enums';
import type { SecureTabScreenProps } from '../config/types';

export function HomeScreen({
  navigation,
}: SecureTabScreenProps<typeof SecureTabName.Home>) {
  return (
    <Home
      onOpenNotifications={() =>
        navigation.navigate(SecureScreenName.Notifications)
      }
      onOpenWallet={() => navigation.navigate(SecureScreenName.Wallet)}
      onOpenSupport={() => navigation.navigate(SecureScreenName.Support)}
    />
  );
}
