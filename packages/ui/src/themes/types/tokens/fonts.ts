import type { LengthPercentage } from '../css';

export type FontFamilyTokens = {
  /**
   * The default font-family.
   */
  regular: string;
  /**
   * The monospace font-family.
   */
  monospace: string;
};

export type FontSizeTokens = {
  /**
   * Extra small font size.
   */
  xs: LengthPercentage;
  /**
   * Small font size.
   */
  sm: LengthPercentage;
  /**
   * Medium or default font size.
   */
  md: LengthPercentage;
  /**
   * Large font size.
   */
  lg: LengthPercentage;
  /**
   * Extra large font size.
   */
  xl: LengthPercentage;
  /**
   * Double extra large font size.
   */
  xxl: LengthPercentage;
};

export type FontWeightTokens = {
  /**
   * A lighter font-weight.
   */
  light: `${number}`;
  /**
   * The default font-weight.
   */
  regular: `${number}`;
  /**
   * The bold font-weight
   */
  strong: `${number}`;
};

export type LetterSpacingTokens = {
  /**
   * A narrower version of the regular letter-spacing.
   */
  narrow: LengthPercentage | 'normal';
  /**
   * The default letter-spacing.
   */
  regular: LengthPercentage | 'normal';
  /**
   * A more spaced out version of the regular letter-spacing.
   */
  spaced: LengthPercentage | 'normal';
};

export type LineHeightTokens = {
  /**
   * A smaller line-height.
   */
  sm: `${number}`;
  /**
   * The default line-height.
   */
  md: `${number}`;
  /**
   * A larger line-height.
   */
  lg: `${number}`;
};

/**
 * Typography tokens.
 */
export type FontTokens = {
  /**
   * The font families.
   */
  family: FontFamilyTokens;
  /**
   * The letter spacing tokens.
   */
  letterSpacing: LetterSpacingTokens;
  /**
   * The line-height tokens.
   */
  lineHeight: LineHeightTokens;
  /**
   * The font size tokens.
   */
  size: FontSizeTokens;
  /**
   * The font weight tokens.
   */
  weight: FontWeightTokens;
};
