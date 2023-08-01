import type { DocEntryPayload, DocPayload } from '@cretadoc/api';
import { renderHook } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { useDocEntry } from './use-doc-entry';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const data: DocPayload<DocEntryPayload> = {
  doc: {
    entry: {
      createdAt: 'entry-1',
      id: 'entry-1',
      name: 'DocEntry 1',
      parent: null,
      path: './entry-1',
      slug: '/entry-1',
      type: 'directory',
      updatedAt: 'entry-1',
    },
  },
};

describe('use-doc-entry', () => {
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
    const { result } = renderHook(() =>
      useDocEntry({ slug: data.doc?.entry?.slug })
    );
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.docEntry).toBeUndefined();
  });

  it('returns the documentation entry', () => {
    const { result } = renderHook(() =>
      useDocEntry({ slug: data.doc?.entry?.slug })
    );

    expect(result.current.docEntry).toStrictEqual(data.doc?.entry);
  });
});
