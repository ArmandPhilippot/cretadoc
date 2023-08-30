import type { Color, Length, NegativeLength } from '../css';
import type {
  ShadowXAxisTokens,
  ShadowYAxisTokens,
  ShadowElevationTokens,
  ShadowTokens,
} from './tokens';

export type ShadowColors = {
  [K in keyof ShadowTokens]: Color;
};

export type ShadowDirection = {
  x: keyof ShadowXAxisTokens;
  y: keyof ShadowYAxisTokens;
};

export type ShadowLayer = {
  /**
   * A positive offset.
   *
   * The builder will take care of the transformation into a negative value on
   * when necessary.
   */
  offset: Exclude<Length, NegativeLength>;
  /**
   * The shadow blur.
   *
   * Negative values are not allowed.
   */
  blur: Length;
  /**
   * The shadow spread.
   */
  spread: Length;
};

export type ShadowLayers = {
  [K in keyof ShadowElevationTokens]: ShadowLayer[];
};
