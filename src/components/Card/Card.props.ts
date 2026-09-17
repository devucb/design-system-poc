import type {ReactNode} from 'react';

export type CardProps = {
  /** Optional inner content. Empty card is a valid Figma state (min height). */
  children?: ReactNode;
};
