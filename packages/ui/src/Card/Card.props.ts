import type { ReactNode } from 'react';
import type { ColorToken, RadiusToken, SpaceToken } from '@ds/theme/tokens';

export type CardProps = {
  /** Optional inner content. Empty card is a valid Figma state. */
  children?: ReactNode;
  /** Inner padding token. Default `$sm`. */
  padding?: SpaceToken;
  /** Fill token. Default `$cardBackground`. */
  backgroundColor?: ColorToken;
  /** Corner token. Default `$md`. */
  borderRadius?: RadiusToken;
};
