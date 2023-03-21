export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const DEFAULT_HOSTNAME = 'localhost';
export const DEFAULT_MODE = ENVIRONMENT.DEVELOPMENT;
export const DEFAULT_PORT = 3000;

export const DEFAULT_API_ROUTE = '/api';

export const DEFAULT_ENTRYPOINT_FILE = 'index.html';
export const DEFAULT_SSR_ROUTE = '/';
export const DEFAULT_STATIC_ROUTE = '/static';

export const SUCCESS_CODE = 200;
