import { Box } from '../Box/Box';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import type { HeaderProps } from './Header.props';

/**
 * Web header: breadcrumbs instead of a title + back control.
 * `aa / bb / cc`, collapsing to `aa / ..... / xx / yy` when the row is tight.
 */
export function Header({
  title,
  crumbs,
  backgroundColor = '$backgroundBase',
}: HeaderProps) {
  return (
    <Box backgroundColor={backgroundColor}>
      <Breadcrumbs items={crumbs ?? [{ label: title }]} />
    </Box>
  );
}
