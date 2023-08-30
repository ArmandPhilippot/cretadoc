import { useCallback, useEffect, useState } from 'react';
import { isBrowser } from '../../utils/helpers';

/**
 * Check if the given query matches the document.
 *
 * @param {string} query - A valid media query.
 * @returns {boolean} True if the query matches.
 */
const isQueryMatching = (query: string): boolean => {
  if (isBrowser()) return window.matchMedia(query).matches;

  return false;
};

/**
 * React hook to wrap the window matchMedia method.
 *
 * @param {string} query - A valid media query.
 * @returns {boolean} True if the query matches the document.
 */
export const useMatchMedia = (query: string): boolean => {
  const [isMatching, setIsMatching] = useState(isQueryMatching(query));

  const updateResult = useCallback(() => {
    setIsMatching(isQueryMatching(query));
  }, [query]);

  useEffect(() => {
    updateResult();
    window.matchMedia(query).addEventListener('change', updateResult);

    return () => {
      window.matchMedia(query).removeEventListener('change', updateResult);
    };
  }, [query, updateResult]);

  return isMatching;
};
