import type { Maybe } from '@cretadoc/utils';
import { type RefObject, useState, useEffect } from 'react';
import { isBrowser } from '../../utils/helpers';

export type ScrollPosition = {
  x: number;
  y: number;
};

const defaultPosition: ScrollPosition = { x: 0, y: 0 };

const getScrollPosition = (el: HTMLElement): ScrollPosition => {
  if (isBrowser()) return { x: el.scrollLeft, y: el.scrollTop };

  return defaultPosition;
};

const getEl = (ref: Maybe<RefObject<HTMLElement>>) => {
  if (ref) return ref.current;

  return isBrowser() ? window.document.documentElement : null;
};

export const useScrollPosition = (
  ref?: RefObject<HTMLElement>
): ScrollPosition => {
  const el = getEl(ref);
  const [scrollPosition, setScrollPosition] =
    useState<ScrollPosition>(defaultPosition);

  useEffect(() => {
    const handleScroll = () => {
      if (el) setScrollPosition(getScrollPosition(el));
    };

    if (!ref) {
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }

    el?.addEventListener('scroll', handleScroll);

    return () => el?.removeEventListener('scroll', handleScroll);
  }, [el, ref]);

  return scrollPosition;
};
