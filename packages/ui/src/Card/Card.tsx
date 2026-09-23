import { Box } from '../Box/Box';
import type { CardProps } from './Card.props';

/** Figma Card: card/background, radius/md, padding spacing/sm. */
export function Card({ children }: CardProps) {
  return (
    <Box backgroundColor="$cardBackground" borderRadius="$md" padding="$md">
      {children}
    </Box>
  );
}
