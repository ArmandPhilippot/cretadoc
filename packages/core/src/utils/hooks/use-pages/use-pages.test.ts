import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { usePages } from './use-pages';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('use-pages-list', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it('should return no errors and no data when fetch is not available', () => {
    const { result } = renderHook(() => usePages());
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.pages).toBeUndefined();
  });
});
