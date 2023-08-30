import { useCallback, useEffect, useState } from 'react';
import { isBrowser } from '../../utils/helpers';

export type ViewportSize = {
  height: number;
  width: number;
};

/**
 * Retrieve the viewport size.
 *
 * @returns {ViewportSize} The viewport size.
 */
const getViewportSize = (): ViewportSize => {
  if (isBrowser())
    return { height: window.innerHeight, width: window.innerWidth };

  return { height: 0, width: 0 };
};

/**
 * React hook to retrieve the viewport size.
 *
 * @returns {ViewportSize} The viewport size.
 */
export const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState(getViewportSize());

  const updateViewportSize = useCallback(() => {
    setViewportSize(getViewportSize());
  }, []);

  useEffect(() => {
    updateViewportSize();

    window.addEventListener('resize', updateViewportSize);
    window.addEventListener('orientationchange', updateViewportSize);

    return () => {
      window.removeEventListener('resize', updateViewportSize);
      window.removeEventListener('orientationchange', updateViewportSize);
    };
  }, [updateViewportSize]);

  return viewportSize;
};
