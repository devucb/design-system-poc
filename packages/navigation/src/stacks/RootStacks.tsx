import { useSession, useHasCompletedSplash } from '@ds/store';
import {NonSecureStackNavigator} from './NonSecureStack';
import {SecureStackNavigator} from './SecureStack';
import {SplashStackNavigator} from './SplashStack';

export function RootStacks() {
  const session = useSession();
  const hasCompletedSplash = useHasCompletedSplash();

  if (!hasCompletedSplash) {
    return <SplashStackNavigator />;
  }

  if (session) {
    return <SecureStackNavigator />;
  }

  return <NonSecureStackNavigator />;
}
