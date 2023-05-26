import type {
  AnimationTokens,
  BorderTokens,
  ColorTokens,
  FontTokens,
  IconTokens,
  ShadowTokens,
  SizeTokens,
  SpacingTokens,
} from './tokens';

export type ThemeScheme = 'dark' | 'light';

export type ThemeTokens = {
  /**
   * The design tokens to define the animations.
   */
  animation: AnimationTokens;
  /**
   * The design tokens to define the borders.
   */
  border: BorderTokens;
  /**
   * The design tokens to define the colors.
   */
  color: ColorTokens;
  /**
   * The design tokens to define the fonts.
   */
  font: FontTokens;
  /**
   * The design tokens to define the icons.
   */
  icon: IconTokens;
  /**
   * The design tokens to define the shadows.
   */
  shadow: ShadowTokens;
  /**
   * The design tokens to define the sizes.
   */
  size: SizeTokens;
  /**
   * The design tokens to define the spacings.
   */
  spacing: SpacingTokens;
};

export type ThemeAuthor = {
  name: string;
  website?: string;
};

type ThemeBase = {
  author?: ThemeAuthor;
  id: string;
  name: string;
  scheme: ThemeScheme;
  tokens: ThemeTokens;
};

export type LightTheme = ThemeBase & {
  scheme: 'light';
};

export type DarkTheme = ThemeBase & {
  scheme: 'dark';
};

export type Theme = LightTheme | DarkTheme;
