import type { CretadocTheme } from '@cretadoc/ui';
import type { Nullable } from '@cretadoc/utils';
import type { SUPPORTED_LOCALES } from '../utils/constants';
import type { Expand } from './utils';

export type CretadocLocale = (typeof SUPPORTED_LOCALES)[number];

export type CretadocPaths = {
  /**
   * The path of the directory that contains the pages.
   */
  pages: Nullable<string>;
};

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

export type CretadocClientConfig = {
  /**
   * Define a copyright to put in your website footer.
   *
   * @default null
   */
  copyright: Nullable<string>;
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

export type CretadocServerConfig = {
  /**
   * The contents paths.
   */
  paths: CretadocPaths;
};

export type CretadocConfig = Expand<
  CretadocClientConfig & CretadocServerConfig
>;
