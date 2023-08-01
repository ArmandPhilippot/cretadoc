import type { APIConfig } from '../types';

export const DEFAULT_CONFIG = {
  data: undefined,
  endpoint: '/graphql',
  graphiql: true,
} as const satisfies APIConfig;

export const DEFAULT_EDGES_NUMBER = 10;

export const DIRECTORY_INDEX_FILENAME = 'index';

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const EXCERPT_SEPARATOR = '<!-- excerpt -->';

export const MARKDOWN_EXTENSION = '.md' as const;

export const ALLOWED_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const;

export const API_ERROR_CODE = {
  /**
   * The API is misconfigured.
   */
  BAD_CONFIGURATION: 'BAD_CONFIGURATION',
  /**
   * Includes an invalid value for a GraphQL field.
   */
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  /**
   * An internal error occurred.
   */
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
