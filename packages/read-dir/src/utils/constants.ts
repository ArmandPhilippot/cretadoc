import type { ReadDirOptions } from '../types';

export const DEFAULT_OPTIONS: Readonly<ReadDirOptions> = {
  depth: undefined,
  extensions: undefined,
  includeFileContents: false,
} as const;
