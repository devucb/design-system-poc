import {Platform} from 'react-native';

/**
 * Linked TTF filenames become the Android family. iOS uses the PostScript name.
 * Web uses the same PostScript names via @font-face.
 */
export const FontFamily = {
  medium: Platform.select({
    ios: 'Inter-Medium',
    web: 'Inter-Medium',
    default: 'Inter_500Medium',
  })!,
  semiBold: Platform.select({
    ios: 'Inter-SemiBold',
    web: 'Inter-SemiBold',
    default: 'Inter_600SemiBold',
  })!,
  bold: Platform.select({
    ios: 'Inter-Bold',
    web: 'Inter-Bold',
    default: 'Inter_700Bold',
  })!,
};
