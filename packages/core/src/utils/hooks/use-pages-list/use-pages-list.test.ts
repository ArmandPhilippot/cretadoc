import type { PageConnectionPayload } from '@cretadoc/api';
import { renderHook, waitFor } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { usePagesList } from './use-pages-list';

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
          name: 'Page 2',
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

const pagesWithSlug = data.pages?.edges.map((page) => page.node) ?? [];

describe('use-pages-list', () => {
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
  it('should be loading the first time', () => {
    const { result } = renderHook(() => usePagesList());

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.pages).toBeUndefined();
  });

  it('returns all the pages', async () => {
    const { result } = renderHook(() => usePagesList());

    await waitFor(() =>
      expect(result.current.pages).toStrictEqual(pagesWithSlug)
    );
  });

  it('can exclude pages by names', () => {
    const excludedName = 'Page 1';
    const expectedPages = pagesWithSlug.filter(
      (page) => page.name !== excludedName
    );
    const { result } = renderHook(() =>
      usePagesList({ exclude: { names: [excludedName] } })
    );

    expect(result.current.pages).toStrictEqual(expectedPages);
  });

  it('can exclude pages by slug', () => {
    const excludedSlug = '/page-2';
    const expectedPages = pagesWithSlug.filter(
      (page) => page.slug !== excludedSlug
    );
    const { result } = renderHook(() =>
      usePagesList({ exclude: { slugs: [excludedSlug] } })
    );

    expect(result.current.pages).toStrictEqual(expectedPages);
  });
});
