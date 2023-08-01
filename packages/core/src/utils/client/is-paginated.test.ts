import { describe, expect, it } from 'vitest';
import { PAGINATED_SLUG_PREFIX } from '../constants';
import { isPaginated } from './is-paginated';

describe('is-paginated', () => {
  it('returns true when path ends with pagination regex', () => {
    expect(isPaginated(`/any-slug${PAGINATED_SLUG_PREFIX}/2`)).toBe(true);
  });

  it('returns false when path does not contain pagination regex', () => {
    expect(isPaginated('/any-slug')).toBe(false);
  });

  it('returns false when path contains pagination regex but not at the end', () => {
    expect(
      isPaginated(`/any-slug${PAGINATED_SLUG_PREFIX}/2/with-another-part`)
    ).toBe(false);
  });
});
