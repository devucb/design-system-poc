import type { ColorToken, SpaceToken } from '@ds/theme';
import type { BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs.props';

export type HeaderProps = {
  /**
   * Screen title from the navigator `options.title`.
   * Uses Text heading + primary. Header owns the top Safe Area.
   */
  title: string;
  /**
   * Web header trail. Native Header ignores this and keeps the title.
   * When omitted, web falls back to a single crumb from `title`.
   */
  crumbs?: BreadcrumbItem[];
  /**
   * Shown when the navigator has a back route. Wired from
   * React Navigation header props, not from the screen tree.
   */
  onBack?: () => void;
  /** Accessibility label for the back control. */
  backAccessibilityLabel?: string;
  /** Header fill. Default `$backgroundBase`. */
  backgroundColor?: ColorToken;
  /** Horizontal token padding. Default `$lg`. */
  paddingHorizontal?: SpaceToken;
  /** Vertical token padding. Default `$mdl`. */
  paddingVertical?: SpaceToken;
  /** Gap between back control and title. Default `$sm`. */
  gap?: SpaceToken;
};
