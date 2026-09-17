import {Platform} from 'react-native';

/**
 * Linked TTF filenames become the Android family. iOS uses the PostScript name.
 */
export const FontFamily = {
  medium: Platform.select({
    ios: 'Inter-Medium',
    default: 'Inter_500Medium',
  }) as string,
  semiBold: Platform.select({
    ios: 'Inter-SemiBold',
    default: 'Inter_600SemiBold',
  }) as string,
  bold: Platform.select({
    ios: 'Inter-Bold',
    default: 'Inter_700Bold',
  }) as string,
};
