import type { LengthPercentage } from '../../css';

/**
 * Size tokens.
 *
 * Control the container sizes.
 */
export type SizeTokens = {
  /**
   * The size of the container used for full screen contents.
   */
  full: LengthPercentage;
  /**
   * The size of the container used for prose.
   */
  prose: LengthPercentage;
  /**
   * The maximum width of the sidebar container.
   */
  sidebar: LengthPercentage;
};
