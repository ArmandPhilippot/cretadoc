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
   * Includes an invalid value for a GraphQL field.
   */
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  /**
   * An internal error occurred.
   */
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
