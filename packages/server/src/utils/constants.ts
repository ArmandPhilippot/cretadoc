export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const DEFAULT_HOSTNAME = 'localhost';
export const DEFAULT_MODE = ENVIRONMENT.DEVELOPMENT;
export const DEFAULT_PORT = 3000;

export const DEFAULT_API_ROUTE = '/api';

export const DEFAULT_STATIC_DIR_ENTRYPOINT = 'index.html';
export const DEFAULT_STATIC_DIR_ROUTE = '/';
