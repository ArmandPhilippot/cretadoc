import { useCallback } from 'react';
import { useScrollBarWidth } from './use-scrollbar-width';

/**
 * React hook to lock/unlock the body scroll.
 *
 * @param {boolean} [isScrollLocked] - Should the scroll be locked?
 */
export const useBodyScrollLock = (isScrollLocked = false) => {
  const scrollbarWidth = useScrollBarWidth();

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, [scrollbarWidth]);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  if (isScrollLocked) lockScroll();
  else unlockScroll();
};
