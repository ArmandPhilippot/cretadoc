import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as styles from '../../components/atoms/typography/visually-hidden/visually-hidden.css';
import { useVisuallyHidden } from './use-visually-hidden';

describe('use-visually-hidden', () => {
  it('returns a visually hidden class name', () => {
    const { result } = renderHook(() => useVisuallyHidden());
    const visuallyHiddenClassName = styles.visuallyHidden({
      isFocusable: false,
    });
    expect(result.current).toBe(visuallyHiddenClassName);
  });

  it('returns a focusable visually hidden class name', () => {
    const { result } = renderHook(() => useVisuallyHidden(true));
    const visuallyHiddenClassName = styles.visuallyHidden({
      isFocusable: true,
    });
    expect(result.current).toBe(visuallyHiddenClassName);
  });
});
