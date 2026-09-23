export const WEB_MOBILE_MAX = 767;
export const WEB_TABLET_MAX = 1023;

export const RAIL_COLLAPSED = 56;
export const RAIL_EXPANDED = 244;

/** Desktop reading column. */
export const DESKTOP_CONTENT_MAX_WIDTH = 720;

/** Hamburger row: spacing.sm + 24px icon + spacing.sm. */
export const MOBILE_MENU_ROW = 40;

export type WebLayout = 'mobile' | 'tablet' | 'desktop';

export function getWebLayout(width: number): WebLayout {
  if (width <= WEB_MOBILE_MAX) {
    return 'mobile';
  }
  if (width <= WEB_TABLET_MAX) {
    return 'tablet';
  }
  return 'desktop';
}
