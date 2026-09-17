import {createBox} from '@shopify/restyle';
import {Theme} from '@theme/theme';

/** View that only accepts theme tokens for color, spacing, and radius. */
export const Box = createBox<Theme>();
