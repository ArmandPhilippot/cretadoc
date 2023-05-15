import type { Nullable } from '@cretadoc/utils';
import { isBrowser } from './is';

/**
 * Retrieve the scrollbar width of either a given element or the window.
 *
 * @param {Nullable<HTMLElement>} [el] - The targeted element.
 * @returns {number} The scrollbar width.
 */
export const getScrollbarWidth = (el?: Nullable<HTMLElement>): number => {
  const defaultWidth = 15;

  if (!isBrowser()) return defaultWidth;

  if (el) {
    const elStyles = window.getComputedStyle(el);
    const borders =
      parseFloat(elStyles.borderLeftWidth) +
      parseFloat(elStyles.borderRightWidth);

    return el.offsetWidth - (el.clientWidth + borders);
  }

  return window.document.body.clientWidth
    ? window.innerWidth - window.document.body.clientWidth
    : 0;
};
