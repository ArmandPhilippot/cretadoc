import type { ColorTokens } from './tokens';

export type ThemeScheme = 'dark' | 'light';

export type ThemeTokens = {
  /**
   * The design tokens to define the colors.
   */
  color: ColorTokens;
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
