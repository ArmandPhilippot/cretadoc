import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getFilePathFrom } from './paths';

describe('get-file-path-from', () => {
  it('returns the entrypoint if a full path is given', () => {
    const entrypoint = '/some/absolute/dir/with-entrypoint';
    const path = '/some/absolute/dir';

    expect(getFilePathFrom(entrypoint, path)).toBe(entrypoint);
  });

  it('concatenates the entrypoint and the path otherwise', () => {
    const entrypoint = 'with-entrypoint';
    const path = '/some/absolute/dir';

    expect(getFilePathFrom(entrypoint, path)).toBe(join(path, entrypoint));
  });
});
