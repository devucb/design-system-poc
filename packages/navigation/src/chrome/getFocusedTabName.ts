import type {NavigationState, PartialState} from '@react-navigation/native';
import {SecureTabName} from '../config/enums';

const TAB_NAMES = new Set<string>(Object.values(SecureTabName));

export function getFocusedTabName(
  state: NavigationState | PartialState<NavigationState> | undefined,
): SecureTabName | null {
  if (!state?.routes?.length) {
    return null;
  }
  const index = state.index ?? 0;
  const route = state.routes[index];
  if (!route) {
    return null;
  }
  if (TAB_NAMES.has(route.name)) {
    return route.name as SecureTabName;
  }
  if (route.state) {
    return getFocusedTabName(route.state);
  }
  return null;
}
