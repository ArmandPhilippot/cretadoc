import type {
  BorderTokens,
  ColorTokens,
  FontTokens,
  SpacingTokens,
} from './tokens';

export type ThemeScheme = 'dark' | 'light';

export type ThemeTokens = {
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
   * The design tokens to define the spacings.
   */
  spacing: SpacingTokens;
};

export type ThemeAuthor = {
  name: string;
  website?: string;
};

export type Theme = {
  author?: ThemeAuthor;
  id: string;
  name: string;
  scheme: ThemeScheme;
  tokens: ThemeTokens;
};

export type Themes = {
  [key: string]: Theme;
};
