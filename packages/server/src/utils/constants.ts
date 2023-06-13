import type { ServerConfig } from '../types';

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const DEFAULT_HOSTNAME = 'localhost';
export const DEFAULT_MODE = ENVIRONMENT.DEVELOPMENT;
export const DEFAULT_PORT = 3000;

export const DEFAULT_ENTRYPOINT_FILE = 'index.html';
export const DEFAULT_SSR_ROUTE = '/';
export const DEFAULT_STATIC_ROUTE = '/static';

export const DEFAULT_CONFIG = {
  api: undefined,
  hmr: undefined,
  hostname: DEFAULT_HOSTNAME,
  mode: DEFAULT_MODE,
  port: DEFAULT_PORT,
  ssr: undefined,
  staticDir: undefined,
} as const satisfies ServerConfig;

export const HTTP_CODE = {
  ERROR: 500,
  SUCCESS: 200,
} as const;

export const SERVER_ERROR_CODE = {
  /**
   * The server is misconfigured.
   */
  BAD_CONFIGURATION: 'BAD_CONFIGURATION',
  /**
   * An unspecified error occurred.
   */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;
