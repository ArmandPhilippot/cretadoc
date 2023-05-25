import type { ReadonlyDeep } from '@cretadoc/utils';
import type { CretadocConfig } from '../types/config';

export const CONFIG_FILE_NAME = 'cretadoc.config.js';

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
      NAME: `The name property is missing or invalid. Please check your configuration in ${CONFIG_FILE_NAME} file.`,
    },
    TYPE: (expected: string, received: string) =>
      `Expected ${expected}, received ${received}.`,
  },
  MISSING: {
    CONFIG: `Cannot find ${CONFIG_FILE_NAME} file. A configuration file is required for Cretadoc to work properly.`,
    MANDATORY_CONFIG_KEYS: `Found a ${CONFIG_FILE_NAME} file but some mandatory keys are missing. Please check your configuration.`,
  },
  UNEXPECTED: 'An unexpected error occurred.',
} as const;

export const DEFAULT_CONFIG: ReadonlyDeep<CretadocConfig> = {
  name: 'Cretadoc',
} as const;
