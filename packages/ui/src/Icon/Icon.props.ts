export const ICON_NAMES = [
  'menu',
  'chevron-back',
  'home',
  'home-outline',
  'explore',
  'explore-outline',
  'activity',
  'activity-outline',
  'profile',
  'profile-outline',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export type IconProps = {
  /** Glyph from the hand-drawn set in `svgs/`. */
  name: IconName;
  color: string;
  size?: number;
};
