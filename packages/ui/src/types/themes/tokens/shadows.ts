export type ShadowElevationTokens = {
  /**
   * Simulate a raised element with box-shadows.
   *
   * The smallest elevation.
   */
  raised: string;
  /**
   * Simulate an elevated element with box-shadows.
   *
   * Between raised and floating.
   */
  elevated: string;
  /**
   * Simulate a floating element with box-shadows.
   *
   * The highest elevation.
   */
  floating: string;
};

export type ShadowXAxisTokens = {
  /**
   * The elevation tokens when the light is cast from the center of the element.
   * So, the shadow appear centered.
   */
  center: ShadowElevationTokens;
  /**
   * The elevation tokens when the light is cast from the right side of the
   * element. So, the shadow appear on the left side.
   */
  left: ShadowElevationTokens;
  /**
   * The elevation tokens when the light is cast from the left side of the
   * element. So, the shadow appear on the right side.
   */
  right: ShadowElevationTokens;
};

export type ShadowYAxisTokens = {
  /**
   * The elevation tokens when light is cast from the top above the element.
   * So, the shadow appear on the bottom.
   */
  bottom: ShadowXAxisTokens;
  /**
   * The elevation tokens when light is cast from the bottom below the element.
   * So, the shadow appear on the top.
   */
  top: ShadowXAxisTokens;
};

export type ShadowTokens = {
  /**
   * The shadows used for destructive action or errors.
   */
  critical: ShadowYAxisTokens;
  /**
   * The shadows used for informative messages.
   */
  info: ShadowYAxisTokens;
  /**
   * The shadows used to create contrast.
   */
  inverted: ShadowYAxisTokens;
  /**
   * The shadows used for disabled elements.
   */
  muted: ShadowYAxisTokens;
  /**
   * The shadows used for the body.
   */
  regular: ShadowYAxisTokens;
  /**
   * The shadows used to indicate success states.
   */
  success: ShadowYAxisTokens;
  /**
   * The shadows used to draw attention to possible issues.
   */
  warning: ShadowYAxisTokens;
};
