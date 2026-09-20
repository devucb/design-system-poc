import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {SecureScreenName, type SecureTabName} from '../config/enums';

export const navigationRef = createNavigationContainerRef();

export function navigateToTab(name: SecureTabName) {
  if (!navigationRef.isReady()) {
    return;
  }
  navigationRef.dispatch(
    CommonActions.navigate({
      name: SecureScreenName.Tabs,
      params: {screen: name},
    }),
  );
}
