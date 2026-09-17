import {useTheme} from '@shopify/restyle';
import {Box} from '@components/Box/Box';
import {Theme} from '@theme/theme';
import type {CardProps} from './Card.props';


/** Figma Card: card/background, radius/md, padding spacing/sm. */
export function Card({children}: CardProps) {
  const theme = useTheme<Theme>();

  return (
    <Box
      backgroundColor="cardBackground"
      borderRadius="md"
      padding="sm"
      width="100%"
      minHeight={theme.card.minHeight}>
      {children}
    </Box>
  );
}
