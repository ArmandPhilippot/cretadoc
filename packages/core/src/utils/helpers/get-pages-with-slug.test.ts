import type { Edge, Page } from '@cretadoc/api';
import { slugify } from '@cretadoc/utils';
import { describe, expect, it } from 'vitest';
import { getPagesWithSlug } from './get-pages-with-slug';

describe('get-pages-with-slug', () => {
  it('returns an array of pages with a slug prop', () => {
    const edges: Array<Edge<Page>> = [
      {
        cursor: 'voluptatum',
        node: {
          createdAt: 'page-1',
          id: 'page-1',
          name: 'Page 1',
          path: './page-1',
          updatedAt: 'page-1',
        },
      },
      {
        cursor: 'magni',
        node: {
          createdAt: 'page-2',
          id: 'page-2',
          name: 'Page 2',
          path: './page-2',
          updatedAt: 'page-2',
        },
      },
    ];

    const pagesWithSlug = getPagesWithSlug(edges);

    expect(pagesWithSlug).toHaveLength(edges.length);

    for (const page of pagesWithSlug)
      expect(page.slug).toBe(`/${slugify(page.name)}`);
  });
});
