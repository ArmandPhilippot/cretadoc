import type { ReadDirOptions } from '../types';

export const FILE_TYPES = ['directory', 'file', 'unknown'] as const;
export const VALID_FILE_TYPES = ['directory', 'file'] as const;

export const DEFAULT_OPTIONS: Readonly<ReadDirOptions> = {
  depth: undefined,
  extensions: undefined,
  includeFileContents: false,
} as const;
