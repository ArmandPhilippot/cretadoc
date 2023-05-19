import * as styles from '../../components/atoms/typography/visually-hidden/visually-hidden.css';

/**
 * React hook to reuse the styles of the VisuallyHidden component.
 *
 * @param {boolean} [isFocusable] - Should the contents be visible when focused?
 * @returns {string} A class name.
 */
export const useVisuallyHidden = (isFocusable = false): string =>
  styles.visuallyHidden({ isFocusable });
