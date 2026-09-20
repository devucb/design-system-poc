import { Box } from '../Box/Box';
import type { CardProps } from './Card.props';

/** Figma Card: card/background, radius/md, padding spacing/sm. */
export function Card({
  children,
  padding = '$sm',
  backgroundColor = '$cardBackground',
  borderRadius = '$md',
}: CardProps) {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      padding={padding}
    >
      {children}
    </Box>
  );
}
