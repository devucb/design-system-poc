import type {ReactNode} from 'react';
import type {Theme} from '@theme/theme';

export type SpacingKey = keyof Theme['spacing'];

export type SpacerProps = {
  /** Spacing token used as a vertical gap. Prefer this over a raw height. */
  size: SpacingKey;
};

export type SectionProps = {
  /** Children stacked vertically. */
  children: ReactNode;
  /**
   * Uniform gap between children. Default `mdl` (Figma spacing/mdl).
   * Mixed gaps: set `gap="none"` and insert Spacer between children.
   */
  gap?: SpacingKey;
};
