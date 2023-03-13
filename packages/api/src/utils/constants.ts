export const DEFAULT_ENDPOINT = '/graphql' as const;
export const DEFAULT_GRAPHIQL = true as const;

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const MARKDOWN_EXTENSION = '.md' as const;

export const API_ERROR_CODE = {
  /**
   * The API is misconfigured.
   */
  BAD_CONFIGURATION: 'BAD_CONFIGURATION',
  /**
   * Includes an invalid value for a field argument.
   */
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  /**
   * An unspecified error occurred.
   */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;
