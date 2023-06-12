import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { usePage } from './use-page';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('use-page-list', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it('should return no errors and no data when fetch is not available', () => {
    const { result } = renderHook(() => usePage());
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.page).toBeUndefined();
  });
});
