import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMatchMedia } from './use-match-media';

const VALID_QUERY = '(min-width: 2000px)';

describe('use-match-media', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => {
      return {
        matches: query === VALID_QUERY,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });

  it('returns false when the query is invalid', () => {
    const query = '';
    const { result } = renderHook(() => useMatchMedia(query));

    expect(result.current).toBe(false);
  });

  it('can compare the given media query with the current document', () => {
    const { result } = renderHook(() => useMatchMedia(VALID_QUERY));

    expect(result.current).toBe(true);
  });
});
