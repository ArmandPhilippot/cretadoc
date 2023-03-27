import type { BorderStyleKeywords, LengthPercentage } from '../css';

export type BorderRadiusTokens = {
  /**
   * The size of sharp borders: the smallest radius (usually `0`).
   */
  sharp: LengthPercentage;
  /**
   * The size of soft borders: a radius between sharp and softer.
   */
  soft: LengthPercentage;
  /**
   * The size of softer borders: a radius between soft and round.
   */
  softer: LengthPercentage;
  /**
   * The size of rounded borders: the highest radius (usually `50%`).
   */
  round: LengthPercentage;
};

export type BorderSizeTokens = {
  /**
   * The size of small borders.
   */
  sm: LengthPercentage;
  /**
   * The size of medium borders.
   */
  md: LengthPercentage;
  /**
   * The size of large borders.
   */
  lg: LengthPercentage;
};

export type BorderStyleTokens = {
  /**
   * The style of regular borders.
   */
  regular: BorderStyleKeywords;
};

/**
 * Border tokens.
 *
 * Control the size and the rounding of borders.
 */
export type BorderTokens = {
  /**
   * The border radius tokens.
   */
  radius: BorderRadiusTokens;
  /**
   * The border size tokens.
   */
  size: BorderSizeTokens;
  /**
   * The border style tokens.
   */
  style: BorderStyleTokens;
};
