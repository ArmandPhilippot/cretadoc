import type { DocEntryConnectionPayload, DocPayload } from '@cretadoc/api';
import { renderHook } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { useDocEntries } from './use-doc-entries';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const data: DocPayload<DocEntryConnectionPayload> = {
  doc: {
    entries: {
      edges: [
        {
          cursor: 'cursor-1',
          node: {
            createdAt: 'entry-1',
            id: 'entry-1',
            name: 'Entry 1',
            parent: null,
            path: './entry-1',
            slug: '/entry-1',
            type: 'directory',
            updatedAt: 'entry-1',
          },
        },
        {
          cursor: 'cursor-2',
          node: {
            createdAt: 'entry-2',
            id: 'entry-2',
            name: 'Entry 2',
            parent: null,
            path: './entry-2',
            slug: '/entry-2',
            type: 'file',
            updatedAt: 'entry-2',
          },
        },
      ],
      pageInfo: {
        endCursor: 'cursor-2',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: 'cursor-1',
        total: 2,
      },
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
    const { result } = renderHook(() => useDocEntries({}));
    expect(result.current.errors).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.docEntries).toBeUndefined();
  });

  it('returns the documentation entries', () => {
    const { result } = renderHook(() => useDocEntries({}));

    expect(result.current.docEntries).toStrictEqual(data.doc?.entries);
  });
});
