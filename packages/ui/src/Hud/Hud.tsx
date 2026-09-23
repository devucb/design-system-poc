import {useSyncExternalStore} from 'react';
import {Box} from '../Box/Box';
import {Loading} from '../Loading/Loading';
import {getHudVisible, subscribeHud} from './hudStore';

const fill = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1000,
} as const;

/**
 * App-level transparent overlay. Mount once at the root. Toggle with
 * `showHud` / `hideHud`.
 */
export function Hud() {
  const visible = useSyncExternalStore(
    subscribeHud,
    getHudVisible,
    getHudVisible,
  );
  if (!visible) {
    return null;
  }

  return (
    <Box
      testID="hud"
      pointerEvents="auto"
      alignItems="center"
      justifyContent="center"
      backgroundColor="$buttonTransparent"
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={fill}
    >
      <Loading testID="hud-loading" />
    </Box>
  );
}
