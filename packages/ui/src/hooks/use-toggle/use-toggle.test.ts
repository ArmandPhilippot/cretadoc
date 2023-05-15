import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToggle } from './use-toggle';

describe('use-toggle', () => {
  it('returns the initial state', () => {
    const initialState = true;
    const { result } = renderHook(() => useToggle(initialState));
    const [state] = result.current;
    expect(state).toBe(initialState);
  });

  it('can switch the state', () => {
    const initialState = true;
    const { result } = renderHook(() => useToggle(initialState));
    const [state, toggle] = result.current;
    expect(state).toBe(initialState);

    act(() => {
      toggle();
    });

    const [newState] = result.current;
    expect(newState).toBe(!initialState);
  });
});
