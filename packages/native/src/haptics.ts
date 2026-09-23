import NativeHaptics from './NativeHaptics';

export type Haptic = 'selection' | 'impact' | 'success' | 'error';

/** Semantic haptic. Catalog primitives call this; screens opt out. */
export function haptic(kind: Haptic) {
  NativeHaptics?.trigger(kind);
}
