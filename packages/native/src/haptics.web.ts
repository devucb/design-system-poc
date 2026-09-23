export type Haptic = 'selection' | 'impact' | 'success' | 'error';

/** Web has no Taptic Engine in this app. */
export function haptic(_kind: Haptic) {}
