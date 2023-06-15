import type { PagePayload } from '@cretadoc/api';
import { renderHook } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { usePage } from './use-page';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const data: PagePayload = {
  page: {
    createdAt: 'page-1',
    id: 'page-1',
    name: 'Page 1',
    path: './page-1',
    slug: '/page-1',
    updatedAt: 'page-1',
  },
};

describe('use-page', () => {
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
    const { result } = renderHook(() => usePage({ slug: data.page?.slug }));
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.page).toBeUndefined();
  });

  it('returns the page', () => {
    const { result } = renderHook(() => usePage({ slug: data.page?.slug }));

    expect(result.current.page).toStrictEqual(data.page);
  });
});
