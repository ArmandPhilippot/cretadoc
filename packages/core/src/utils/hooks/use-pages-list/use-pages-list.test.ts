import type { Page } from '@cretadoc/api';
import { slugify } from '@cretadoc/utils';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { type PageWithSlug, usePagesList } from './use-pages-list';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('use-pages-list', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it('should return no errors and no data when fetch is not available', () => {
    const { result } = renderHook(() => usePagesList());
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.pages).toBeUndefined();
  });

  it('can return the pages list after adding a slug to each page', () => {
    const data: { pages: Page[] } = {
      pages: [
        {
          createdAt: 'page-1',
          id: 'page-1',
          name: 'Page 1',
          path: './page-1',
          updatedAt: 'page-1',
        },
        {
          createdAt: 'page-2',
          id: 'page-2',
          name: 'Page 2',
          path: './page-2',
          updatedAt: 'page-2',
        },
      ],
    };
    const pagesWithSlug: PageWithSlug[] = data.pages.map((page) => {
      return {
        ...page,
        slug: `/${slugify(page.name)}`,
      };
    });

    fetchMocker.mockResponse(JSON.stringify({ data }));

    const { result } = renderHook(() => usePagesList());

    expect(result.current.pages).toStrictEqual(pagesWithSlug);
  });
});
