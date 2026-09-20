import type {IconName} from './Icon.props';

export type GlyphPath = {
  d: string;
  fill?: boolean;
  stroke?: boolean;
};

/** Runtime paths. Match the drawings in `svgs/*.svg`. */
export const GLYPHS: Record<IconName, GlyphPath[]> = {
  menu: [
    {d: 'M4 7h16M4 12h16M4 17h16', stroke: true},
  ],
  'chevron-back': [{d: 'M15 6l-6 6 6 6', stroke: true}],
  home: [
    {
      d: 'M3.8 10.7 12 3.6l8.2 7.1V20a1.2 1.2 0 0 1-1.2 1.2h-5.2v-6.4H9.2V21.2H5a1.2 1.2 0 0 1-1.2-1.2z',
      fill: true,
    },
  ],
  'home-outline': [
    {
      d: 'M4.5 10.8 12 4.4l7.5 6.4V20a.8.8 0 0 1-.8.8h-4.4v-6.2H9.7V20.8H5.3a.8.8 0 0 1-.8-.8z',
      stroke: true,
    },
  ],
  explore: [
    {d: 'M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z', stroke: true},
    {d: 'M14.8 8.6 13 13.2 8.6 14.8 10.4 10.2z', fill: true},
  ],
  'explore-outline': [
    {d: 'M12 4.2a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6z', stroke: true},
    {d: 'M14.4 9 13 13l-4 1.4 1.4-4z', stroke: true},
  ],
  activity: [{d: 'M3 12h3.2l2.2-6.2L12.2 18l2.4-6H21', stroke: true}],
  'activity-outline': [{d: 'M3 12h3.2l2.2-6.2L12.2 18l2.4-6H21', stroke: true}],
  profile: [
    {d: 'M12 4.2a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z', fill: true},
    {
      d: 'M5 20.2v-.6C5 16.4 8.1 14 12 14s7 2.4 7 5.6v.6z',
      fill: true,
    },
  ],
  'profile-outline': [
    {d: 'M12 5.2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z', stroke: true},
    {d: 'M6.2 19.5v-.4c0-2.6 2.6-4.6 5.8-4.6s5.8 2 5.8 4.6v.4', stroke: true},
  ],
};
