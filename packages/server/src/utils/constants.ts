export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const DEFAULT_HOSTNAME = 'localhost';
export const DEFAULT_MODE = ENVIRONMENT.DEVELOPMENT;
export const DEFAULT_PORT = 3000;
