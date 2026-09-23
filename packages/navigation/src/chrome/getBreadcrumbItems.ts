import type {NavigationState, PartialState} from '@react-navigation/native';
import type { BreadcrumbItem } from '@ds/ui';
import {StackName} from '../config/enums';
import {
  nonSecureScreens,
  secureScreens,
  tabScreens,
} from '../config/screenDefinitions';

const SKIP = new Set<string>([
  StackName.Splash,
  StackName.NonSecure,
  StackName.Secure,
  'Tabs',
  'Splash',
]);

const titleKeyByName = new Map<string, string>(
  [...tabScreens, ...secureScreens, ...nonSecureScreens].flatMap(screen =>
    screen.titleKey ? [[screen.name, screen.titleKey]] : [],
  ),
);

function walk(
  state: NavigationState | PartialState<NavigationState> | undefined,
): string[] {
  if (!state?.routes?.length) {
    return [];
  }
  const names: string[] = [];
  const last = state.index ?? state.routes.length - 1;
  for (let index = 0; index <= last; index += 1) {
    const route = state.routes[index];
    if (!route) {
      continue;
    }
    if (route.state) {
      names.push(...walk(route.state));
      continue;
    }
    if (!SKIP.has(route.name)) {
      names.push(route.name);
    }
  }
  return names;
}

export function getBreadcrumbItems(
  state: NavigationState | PartialState<NavigationState> | undefined,
  t: (key: string) => string,
  onNavigate: (name: string) => void,
): BreadcrumbItem[] {
  const names = walk(state);
  return names.map((name, index) => {
    const titleKey = titleKeyByName.get(name);
    return {
      label: titleKey ? t(titleKey) : name,
      onPress:
        index < names.length - 1 ? () => onNavigate(name) : undefined,
    };
  });
}
