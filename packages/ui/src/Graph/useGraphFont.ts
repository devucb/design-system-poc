import { useFont } from '@shopify/react-native-skia';

/** Skia cannot match Inter via `matchFont` (family is Inter, not Inter-Medium). */
export function useGraphFont(size = 12) {
  return useFont(require('./Inter_500Medium.ttf'), size);
}
