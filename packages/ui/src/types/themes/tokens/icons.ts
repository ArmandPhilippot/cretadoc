import type { LengthPercentage } from '../../css';

export type IconSizeTokens = {
  /**
   * Extra small icon size.
   */
  xs: LengthPercentage;
  /**
   * Small icon size.
   */
  sm: LengthPercentage;
  /**
   * Medium or default icon size.
   */
  md: LengthPercentage;
  /**
   * Large icon size.
   */
  lg: LengthPercentage;
  /**
   * Extra large icon size.
   */
  xl: LengthPercentage;
};

export type IconTokens = {
  /**
   * The tokens to define icons sizes.
   */
  size: IconSizeTokens;
};
