import type { Nullable } from '@cretadoc/utils';
import { isBrowser } from './is';

/**
 * Retrieve the scrollbar width.
 *
 * @param {string} [rootSelector] - A selector to query the root element.
 * @returns {number} The scrollbar width.
 */
export const getScrollbarWidth = (rootSelector?: string): number => {
  const defaultWidth = 15;

  if (!isBrowser()) return defaultWidth;

  if (rootSelector) {
    const root = document.querySelector(
      rootSelector
    ) satisfies Nullable<HTMLElement>;

    return root ? root.offsetWidth - root.scrollWidth : 0;
  }

  return window.document.body.scrollWidth
    ? window.innerWidth - window.document.body.scrollWidth
    : 0;
};
