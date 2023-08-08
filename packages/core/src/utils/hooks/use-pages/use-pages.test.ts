import type { PageConnectionPayload } from '@cretadoc/api';
import { renderHook } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { DEFAULT_CONFIG, ROUTES } from '../../constants';
import { usePages } from './use-pages';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const data: PageConnectionPayload = {
  pages: {
    edges: [
      {
        cursor: 'voluptatum',
        node: {
          createdAt: 'page-1',
          id: 'page-1',
          name: 'Page 1',
          path: './page-1',
          slug: '/page-1',
          updatedAt: 'page-1',
        },
      },
      {
        cursor: 'magni',
        node: {
          createdAt: 'page-2',
          id: 'page-2',
          name: DEFAULT_CONFIG.pages.homepage,
          path: './page-2',
          slug: '/page-2',
          updatedAt: 'page-2',
        },
      },
    ],
    pageInfo: {
      endCursor: 'magni',
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: 'voluptatum',
      total: 2,
    },
  },
};

describe('use-pages', () => {
  beforeEach(() => {
    fetchMocker.mockResponseOnce(JSON.stringify({ data }));
  });

  afterAll(() => {
    fetchMocker.resetMocks();
  });

  /*
   * The first test is always undefined. I tried `vi.useFakeTimers` and
   * `waitFor` but it always fails. So I don't know how to avoid this "useless"
   * test.
   */
  it('should return no errors and no data when fetch is not available', () => {
    const { result } = renderHook(() => usePages());

    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.pages).toBeUndefined();
  });

  it('returns the sorted pages with homepage first', () => {
    const pages = data.pages?.edges.map((page) => page.node) ?? [];
    const expectedPages = pages
      .map((page) => {
        return {
          ...page,
          slug:
            page.name === DEFAULT_CONFIG.pages.homepage
              ? ROUTES.HOMEPAGE
              : page.slug,
        };
      })
      .reverse();
    const { result } = renderHook(() => usePages());

    expect(result.current.pages).toStrictEqual(expectedPages);
  });
});
