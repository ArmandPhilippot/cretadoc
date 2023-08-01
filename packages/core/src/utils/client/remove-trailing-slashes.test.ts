import { describe, expect, it } from 'vitest';
import { removeTrailingSlashes } from './remove-trailing-slashes';

describe('remove-trailing-slashes', () => {
  it('can remove a single slash at the end of a string', () => {
    const expectedStr = 'dolores';
    const result = removeTrailingSlashes(`${expectedStr}/`);

    expect(result).toBe(expectedStr);
  });

  it('can remove a multiple slashes at the end of a string', () => {
    const expectedStr = 'dolores';
    const result = removeTrailingSlashes(`${expectedStr}////`);

    expect(result).toBe(expectedStr);
  });

  it('returns the same string if there are no slashes at the end', () => {
    const expectedStr = 'dolores';
    const result = removeTrailingSlashes(expectedStr);

    expect(result).toBe(expectedStr);
  });
});
