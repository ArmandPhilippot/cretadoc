import type { Color } from '../css';

export type ExtendedColorsTokens = {
  /**
   * The base color.
   */
  base: Color;
  /**
   * A darker version of the base color.
   */
  dark: Color;
  /**
   * A lighter version of the base color.
   */
  light: Color;
};

export type ColorContextTokens = {
  /**
   * The color used for destructive action or errors.
   */
  critical: Color;
  /**
   * The color used for informative messages.
   */
  info: Color;
  /**
   * The colors used to create contrast.
   */
  inverted: ExtendedColorsTokens;
  /**
   * The color used for disabled elements.
   */
  muted: Color;
  /**
   * The colors used for the body.
   */
  regular: ExtendedColorsTokens;
  /**
   * The color used to indicate success states.
   */
  success: Color;
  /**
   * The color used to draw attention to possible issues.
   */
  warning: Color;
};

type On<Type> = {
  [Property in keyof Type as `on${Capitalize<
    string & Property
  >}`]: Type[Property];
};

export type OnColorContextTokens = On<Omit<ColorContextTokens, 'regular'>>;

export type OnPrimaryColorTokens = On<Pick<ColorTokens, 'primary'>>;

export type ColorTokens = {
  /**
   * The tokens to define backgrounds colors.
   */
  background: ColorContextTokens;
  /**
   * The tokens to define borders colors.
   */
  borders: ColorContextTokens;
  /**
   * The tokens to define foregrounds colors.
   */
  foreground: Omit<ColorContextTokens, 'inverted'> &
    OnColorContextTokens &
    OnPrimaryColorTokens;
  /**
   * The tokens to define the primary colors.
   */
  primary: ExtendedColorsTokens;
};
