import type { ReactNode } from 'react';
import type { SpaceToken } from '@ds/theme/tokens';

export type { SpaceToken };

export type SpacerProps = {
  /** Space token used as a vertical gap. Pass `$lg`, never a raw height. */
  size: SpaceToken;
};

export type SectionProps = {
  /** Children stacked vertically. */
  children: ReactNode;
  /**
   * Uniform gap between children. Default `$mdl` (Figma spacing/mdl).
   * Mixed gaps: set `gap="$none"` and insert Spacer between children.
   */
  gap?: SpaceToken;
};
