import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useLocalStorage from './use-local-storage';

describe('use-local-storage', () => {
  it('can read and write into local storage', () => {
    const key = 'quos';
    const initialValue = 'deleniti sint dolores';
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toBe(initialValue);

    const newValue = 'id nesciunt odio';

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
  });
});
