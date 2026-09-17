export type HeaderProps = {
  /**
   * Screen title from the navigator `options.title`.
   * Uses Text heading + primary. Header owns the top Safe Area.
   */
  title: string;
  /**
   * Shown when the navigator has a back route. Wired from
   * React Navigation header props, not from the screen tree.
   */
  onBack?: () => void;
  /** Accessibility label for the back control. */
  backAccessibilityLabel?: string;
};
