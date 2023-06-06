import type {
  CretadocClientConfig,
  CretadocConfig,
  CretadocLocale,
  CretadocServerConfig,
} from '../types/config';

export const CONFIG_FILE_NAME = 'cretadoc.config.js';

export const CRETADOC_REPOSITORY = {
  label: 'Cretadoc',
  link: 'https://github.com/ArmandPhilippot/cretadoc',
};

export const CORE_ERROR_CODE = {
  /**
   * A problem occurred with API.
   */
  BAD_API_RESPONSE: 'BAD_API_RESPONSE',
  /**
   * The CORE is misconfigured.
   */
  BAD_CONFIGURATION: 'BAD_CONFIGURATION',
  /**
   * An unspecified error occurred.
   */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ROUTES = {
  API: '/api',
  HOMEPAGE: '/',
} as const;

export const SUPPORTED_LOCALES = ['en'] as const;

export const DEFAULT_LOCALE = 'en' as const satisfies CretadocLocale;

export const DEFAULT_CLIENT_CONFIG = {
  copyright: null,
  hideGenerator: false,
  locale: 'en',
  name: 'Cretadoc',
  theme: 'cretadoc-light',
} as const satisfies CretadocClientConfig;

export const DEFAULT_SERVER_CONFIG = {
  paths: {
    pages: null,
  },
} as const satisfies CretadocServerConfig;

export const DEFAULT_CONFIG = {
  ...DEFAULT_CLIENT_CONFIG,
  ...DEFAULT_SERVER_CONFIG,
} as const satisfies CretadocConfig;

export const LOCAL_STORAGE_KEY = {
  THEME: 'cretadoc-theme',
} as const;
