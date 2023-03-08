import { describe, expect, it } from 'vitest';
import type { ReadDirOptions } from '../src/types';
import { DEFAULT_OPTIONS } from '../src/utils/constants';
import { mergeOptionsWithDefault } from '../src/utils/helpers/config';

describe('merge-options-with-default', () => {
  it('merges partial options with the default ones', () => {
    const options: Partial<ReadDirOptions> = { depth: 1 };
    const result = mergeOptionsWithDefault(options);

    expect(result.depth).toBe(options.depth);
    expect(result.extensions).toBe(DEFAULT_OPTIONS.extensions);
    expect(result.includeFileContents).toBe(
      DEFAULT_OPTIONS.includeFileContents
    );
  });

  it('returns the default options if no options are provided', () => {
    const options = mergeOptionsWithDefault(undefined);

    expect(options.depth).toBe(DEFAULT_OPTIONS.depth);
    expect(options.extensions).toBe(DEFAULT_OPTIONS.extensions);
    expect(options.includeFileContents).toBe(
      DEFAULT_OPTIONS.includeFileContents
    );
  });
});
