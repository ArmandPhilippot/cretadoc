import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { PAGES_FIXTURES_DIR } from '../../../tests/utils/constants';
import { getRelativePath, isAbsoluteDirPath } from './paths';

describe('get-relative-path', () => {
  it('returns the relative path of to based on from', () => {
    const from = '/root/directory/';
    const to = '/root/directory/nested/file';
    const expected = to.replace(from, './');

    expect(getRelativePath(from, to)).toBe(expected);
  });

  it('throws an error if from is not an absolute path', () => {
    const from = './root/directory/';
    const to = '/root/directory/nested/file';

    expect(() => getRelativePath(from, to)).toThrowError();
  });

  it('throws an error if to is not an absolute path', () => {
    const from = '/root/directory/';
    const to = './nested/file';

    expect(() => getRelativePath(from, to)).toThrowError();
  });

  it('throws an error if to does not start with from', () => {
    const from = '/root/directory/';
    const to = '/another/root/directory/';

    expect(() => getRelativePath(from, to)).toThrowError();
  });
});

describe('is-absolute-dir-path', () => {
  it('returns true if the given absolute path is a directory', async () => {
    const result = await isAbsoluteDirPath(PAGES_FIXTURES_DIR);
    expect(result).toBe(true);
  });

  it('returns false if the given absolute path is not a directory', async () => {
    const result = await isAbsoluteDirPath(
      resolve(PAGES_FIXTURES_DIR, '.keep')
    );
    expect(result).toBe(false);
  });
});
