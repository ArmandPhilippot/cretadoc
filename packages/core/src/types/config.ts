import type { CretadocTheme } from '@cretadoc/ui';
import type { SUPPORTED_LOCALES } from '../utils/constants';

export type CretadocLocale = (typeof SUPPORTED_LOCALES)[number];

export type CretadocThemes = {
  /**
   * The dark theme.
   */
  dark: CretadocTheme;
  /**
   * The light theme.
   */
  light: CretadocTheme;
};

export type CretadocConfig = {
  /**
   * The website locale.
   */
  locale: CretadocLocale;
  /**
   * Your website name.
   */
  name: string;
  /**
   * The website themes.
   */
  theme: CretadocThemes | CretadocTheme;
};
