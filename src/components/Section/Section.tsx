import {useTheme} from '@shopify/restyle';
import {Box} from '@components/Box/Box';
import {Theme} from '@theme/theme';
import type {SectionProps, SpacerProps} from './Section.props';


/** Invisible gap. Use between children when a Section needs mixed spacing. */
export function Spacer({size}: SpacerProps) {
  const theme = useTheme<Theme>();
  return <Box height={theme.spacing[size]} width="100%" />;
}

/**
 * Figma Section: vertical stack. Uniform gap via the `gap` token.
 */
export function Section({children, gap = 'mdl'}: SectionProps) {
  return (
    <Box
      width="100%"
      flexDirection="column"
      alignItems="stretch"
      gap={gap}>
      {children}
    </Box>
  );
}
