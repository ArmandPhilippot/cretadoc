import { useCallback, useEffect, useState } from 'react';
import { getScrollbarWidth } from '../helpers';

/**
 * React hook to retrieve the current scrollbar width.
 *
 * @param {string} [rootSelector] - A selector to query the root element.
 * @returns {number} The scrollbar width.
 */
export const useScrollBarWidth = (rootSelector?: string): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    setScrollbarWidth(getScrollbarWidth(rootSelector));
  }, [rootSelector]);

  const updateScrollbarWidth = useCallback(() => {
    const newSize = getScrollbarWidth(rootSelector);
    setScrollbarWidth(newSize);
  }, [rootSelector]);

  useEffect(() => {
    window.addEventListener('resize', updateScrollbarWidth);
    window.addEventListener('orientationchange', updateScrollbarWidth);

    return () => {
      window.removeEventListener('resize', updateScrollbarWidth);
      window.removeEventListener('orientationchange', updateScrollbarWidth);
    };
  }, [updateScrollbarWidth]);

  return scrollbarWidth;
};
