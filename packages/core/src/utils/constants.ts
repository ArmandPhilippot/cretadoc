import type { ThemeScheme } from '@cretadoc/ui';
import type { CretadocConfig, CretadocLocale } from '../types/config';

export const CONFIG_FILE_NAME = 'cretadoc.config.js';

export const CRETADOC_REPOSITORY = {
  label: 'Cretadoc',
  link: 'https://github.com/ArmandPhilippot/cretadoc',
};

export const CORE_ERROR_CODE = {
  /**
   * The CORE is misconfigured.
   */
  BAD_CONFIGURATION: 'BAD_CONFIGURATION',
  /**
   * An unspecified error occurred.
   */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ERROR = {
  EMPTY: {
    CONFIG: `Found a ${CONFIG_FILE_NAME} file but it does not export a configuration. Some keys are required for Cretadoc to work properly.`,
  },
  INVALID: {
    CONFIG: {
      LOCALE: (received: string) =>
        `The provided locale is not supported. Please check your configuration in ${CONFIG_FILE_NAME} file. Received: ${received}` as const,
      THEME: {
        FORMAT: `The theme property must be a string or an object with dark and light properties containing a string. The received theme is invalid. Please check your configuration in ${CONFIG_FILE_NAME} file.`,
        VALUE: (received: string, kind?: ThemeScheme) =>
          `The provided ${
            kind ? `${kind} ` : ''
          }theme does not exist. Please check your configuration in ${CONFIG_FILE_NAME} file. Received: ${received}` as const,
      },
    },
    TYPE: (expected: string, received: string) =>
      `Expected ${expected}, received ${received}.` as const,
  },
  MISSING: {
    CONFIG: `Cannot find ${CONFIG_FILE_NAME} file. A configuration file is required for Cretadoc to work properly.`,
    MANDATORY_CONFIG_KEYS: `Found a ${CONFIG_FILE_NAME} file but some mandatory keys are missing. Please check your configuration.`,
  },
  UNEXPECTED: 'An unexpected error occurred.',
} as const;

export const ROUTES = {
  HOMEPAGE: '/',
};

export const SUPPORTED_LOCALES = ['en'] as const;

export const DEFAULT_LOCALE = 'en' as const satisfies CretadocLocale;

export const DEFAULT_CONFIG = {
  copyright: undefined,
  hideGenerator: false,
  locale: 'en',
  name: 'Cretadoc',
  theme: 'cretadoc-light',
} as const satisfies CretadocConfig;

export const LOCAL_STORAGE_KEY = {
  THEME: 'cretadoc-theme',
} as const;
