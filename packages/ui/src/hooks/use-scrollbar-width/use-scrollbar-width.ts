import { type RefObject, useCallback, useEffect, useState } from 'react';
import { getScrollbarWidth } from '../../helpers';

/**
 * React hook to retrieve the current scrollbar width.
 *
 * @param {RefObject<HTMLElement>} [ref] - The targeted element.
 * @returns {number} The scrollbar width.
 */
export const useScrollBarWidth = (ref?: RefObject<HTMLElement>): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const updateScrollbarWidth = useCallback(() => {
    setScrollbarWidth(getScrollbarWidth(ref?.current));
  }, [ref]);

  useEffect(() => {
    updateScrollbarWidth();
    window.addEventListener('resize', updateScrollbarWidth);
    window.addEventListener('orientationchange', updateScrollbarWidth);

    return () => {
      window.removeEventListener('resize', updateScrollbarWidth);
      window.removeEventListener('orientationchange', updateScrollbarWidth);
    };
  }, [updateScrollbarWidth]);

  return scrollbarWidth;
};
