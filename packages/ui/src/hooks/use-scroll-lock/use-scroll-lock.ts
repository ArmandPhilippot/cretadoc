import { type RefObject, useCallback, useEffect, useState } from 'react';
import { useScrollBarWidth } from '../use-scrollbar-width';

/**
 * React hook to lock/unlock the scroll on the body or the given element.
 *
 * @param {boolean} [isScrollLocked] - Should the scroll be locked?
 * @param {RefObject<HTMLElement>} [ref] - The targeted element.
 */
export const useScrollLock = (
  isScrollLocked = false,
  ref?: RefObject<HTMLElement>
) => {
  const el = ref?.current ?? document.body;
  const [originalStyle, setOriginalStyle] = useState(el.style.cssText);
  const scrollbarWidth = useScrollBarWidth(ref);

  useEffect(() => {
    setOriginalStyle(el.style.cssText);
  }, [el]);

  const lockScroll = useCallback(() => {
    const elOriginalPaddingRight = window.getComputedStyle(el).paddingRight;
    el.style.paddingRight = elOriginalPaddingRight
      ? `calc(${elOriginalPaddingRight} + ${scrollbarWidth}px)`
      : `${scrollbarWidth}px`;
    el.style.overflow = 'hidden';
  }, [el, scrollbarWidth]);

  const unlockScroll = useCallback(() => {
    el.style.cssText = originalStyle;
  }, [el, originalStyle]);

  useEffect(() => {
    if (isScrollLocked) lockScroll();
    else unlockScroll();
  }, [isScrollLocked, lockScroll, unlockScroll]);
};
