import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

/**
 * Scroll view the native Sheet knows about. A list inside gorhom has to use it,
 * otherwise the sheet pan gesture and the list scroll fight each other.
 */
export const SheetScrollView = BottomSheetScrollView;
