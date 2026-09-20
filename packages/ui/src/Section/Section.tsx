import { Box } from '../Box/Box';
import type { SectionProps, SpacerProps } from './Section.props';

/** Invisible gap. Use between children when a Section needs mixed spacing. */
export function Spacer({ size }: SpacerProps) {
  return <Box height={size} />;
}

/**
 * Figma Section: vertical stack. Uniform gap via the `gap` token.
 * Stretch is the default cross-axis alignment — children fill the column.
 */
export function Section({ children, gap = '$mdl' }: SectionProps) {
  return (
    <Box flexDirection="column" alignItems="stretch" gap={gap}>
      {children}
    </Box>
  );
}
