/**
 * Check if the window object is defined.
 *
 * @returns {boolean} True if it is browser.
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' && !!window.document;
