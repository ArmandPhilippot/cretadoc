import type { ReadDirOptions } from '../types';

export const DEFAULT_OPTIONS = {
  depth: undefined,
  extensions: undefined,
  includeFileContents: false,
} as const satisfies ReadDirOptions;
