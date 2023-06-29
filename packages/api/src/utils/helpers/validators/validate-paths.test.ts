import { describe, expect, it } from 'vitest';
import { validateRelativePath } from './validate-paths';

describe('validate-relative-path', () => {
  it('returns an empty array when receiving a relative path', () => {
    const result = validateRelativePath('./relative/path');
    expect(result).toStrictEqual([]);
  });

  it('returns an error when receiving an absolute path', () => {
    const result = validateRelativePath('/an/absolute/path');
    expect(result).toStrictEqual(['Must be a relative path']);
  });
});
