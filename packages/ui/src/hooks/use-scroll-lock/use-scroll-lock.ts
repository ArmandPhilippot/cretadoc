import type { Nullable } from '@cretadoc/utils';
import { type RefObject, useCallback, useEffect, useRef, useMemo } from 'react';
import { useScrollBarWidth } from '../use-scrollbar-width';

type Styles = {
  overflow: string;
  paddingRight: string;
};

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
  const scrollbarWidth = useScrollBarWidth(ref);
  const elRef = useRef<Nullable<HTMLElement>>(null);
  const initialStyles = useRef<Nullable<Styles>>(null);
  const lockedStyles: Styles = useMemo(() => {
    return {
      overflow: 'hidden',
      paddingRight: `calc(${
        initialStyles.current?.paddingRight ?? 0
      } + ${scrollbarWidth}px)`,
    };
  }, [scrollbarWidth]);

  const getUnlockedStyles = useCallback((): Styles => {
    if (!elRef.current)
      return {
        overflow: '',
        paddingRight: '',
      };

    const computedStyle = window.getComputedStyle(elRef.current);
    return {
      overflow: computedStyle.overflow,
      paddingRight: computedStyle.paddingRight,
    };
  }, []);

  useEffect(() => {
    elRef.current = ref ? ref.current : document.body;
    initialStyles.current = getUnlockedStyles();
  }, [getUnlockedStyles, ref]);

  const lockScroll = useCallback(() => {
    if (!elRef.current) return;

    elRef.current.style.overflow = lockedStyles.overflow;
    elRef.current.style.paddingRight = lockedStyles.paddingRight;
  }, [lockedStyles]);

  const unlockScroll = useCallback(() => {
    if (!elRef.current) return;

    elRef.current.style.overflow = initialStyles.current?.overflow ?? '';
    elRef.current.style.paddingRight =
      initialStyles.current?.paddingRight ?? '';
  }, []);

  useEffect(() => {
    if (isScrollLocked) lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isScrollLocked, lockScroll, unlockScroll]);
};
