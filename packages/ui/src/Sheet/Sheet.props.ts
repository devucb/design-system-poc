import type { ReactNode } from 'react';
import type { ColorToken, SpaceToken } from '@ds/theme';

/**
 * `content` hugs the children — the default, and what dynamic content wants.
 * `large` gives the sheet a fixed tall box, which a scrollable body
 * (`List` from `@ds/ui`) needs because a virtualized list has no natural height.
 */
export type SheetSize = 'content' | 'large';

export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  /** Content inset. Omit it and compose padding on the children instead. */
  padding?: SpaceToken;
  backgroundColor?: ColorToken;
  size?: SheetSize;
};
