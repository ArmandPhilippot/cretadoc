import type { CretadocTheme } from '@cretadoc/ui';
import type { Maybe } from '@cretadoc/utils';
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
   * Define a copyright to put in your website footer.
   *
   * @default undefined
   */
  copyright: Maybe<string>;
  /**
   * Should we hide the "Built with" message in website footer?
   *
   * @default false
   */
  hideGenerator: boolean;
  /**
   * The website locale.
   *
   * @default 'en'
   */
  locale: CretadocLocale;
  /**
   * Your website name.
   *
   * @default Cretadoc
   */
  name: string;
  /**
   * The website themes.
   */
  theme: CretadocThemes | CretadocTheme;
};
