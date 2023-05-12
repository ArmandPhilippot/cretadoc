import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHeadingsTree } from './use-headings-tree';

describe('use-headings-tree', () => {
  it('returns a tree of headings in the document', () => {
    const { result } = renderHook(() => useHeadingsTree());
    expect(result.current).toHaveLength(0);
  });

  it('returns a tree of all headings except H1', () => {
    const { result } = renderHook(() => useHeadingsTree({ fromLevel: 2 }));
    expect(result.current).toHaveLength(0);
  });

  it('returns a tree of all headings except H6', () => {
    const { result } = renderHook(() => useHeadingsTree({ toLevel: 5 }));
    expect(result.current).toHaveLength(0);
  });

  it('returns only H1 in the document', () => {
    const { result } = renderHook(() =>
      useHeadingsTree({ fromLevel: 1, toLevel: 1 })
    );
    expect(result.current).toHaveLength(0);
  });

  it('returns a tree of headings in the given wrapper', () => {
    const wrapper = document.createElement('div');
    const h1 = document.createElement('h1');
    const h1Content = 'harum quasi delectus';
    h1.textContent = h1Content;
    wrapper.appendChild(h1);
    const { result } = renderHook(() => useHeadingsTree({ wrapper }));
    expect(result.current).toHaveLength(1);
    expect(result.current[0]?.label).toBe(h1Content);
  });

  it('throws an error when options are misconfigured', () => {
    expect(() =>
      renderHook(() => useHeadingsTree({ fromLevel: 2, toLevel: 1 }))
    ).toThrowError(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );
  });
});
