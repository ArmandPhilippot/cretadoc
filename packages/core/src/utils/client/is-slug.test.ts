import { describe, expect, it } from 'vitest';
import { isSlug } from './is-slug';

describe('is-slug', () => {
  it('returns true if the string starts with a slash', () => {
    expect(isSlug('/aspernatur')).toBe(true);
  });

  it('returns false if the string does not start with a slash', () => {
    expect(isSlug('aspernatur/')).toBe(false);
  });
});
