import { type RefObject, useCallback, useEffect, useState } from 'react';
import { isBrowser } from '../../helpers';

export type ScrollPosition = {
  x: number;
  y: number;
};

const getScrollPosition = (el: HTMLElement): ScrollPosition => {
  if (isBrowser()) return { x: el.scrollLeft, y: el.scrollTop };

  return { x: 0, y: 0 };
};

export const useScrollPosition = (ref?: RefObject<HTMLElement>) => {
  const el = ref?.current ?? window.document.documentElement;
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(
    getScrollPosition(el)
  );

  const handleScroll = useCallback(() => {
    setScrollPosition(getScrollPosition(el));
  }, [el]);

  useEffect(() => {
    if (ref?.current) {
      el.addEventListener('scroll', handleScroll);

      return () => el.removeEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [el, handleScroll, ref]);

  return scrollPosition;
};
