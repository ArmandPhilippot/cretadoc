import { describe, expect, it } from 'vitest';
import { PAGINATED_SLUG_PREFIX } from '../constants';
import { getSlugInfoFrom } from './get-slug-info-from';

describe('get-slug-info-from', () => {
  it('returns only the slug if the path is not paginated', () => {
    const slug = '/quae';
    const result = getSlugInfoFrom(slug);

    expect(result).toStrictEqual({ slug });
  });

  it('returns the slug and a page number if the path is paginated', () => {
    const slug = '/quae';
    const pageNumber = 3;
    const result = getSlugInfoFrom(
      `${slug}${PAGINATED_SLUG_PREFIX}/${pageNumber}`
    );

    expect(result).toStrictEqual({
      pageNumber,
      slug,
    });
  });
});
