import type { Nullable } from '@cretadoc/utils';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle route change.
 *
 * @param cb - A callback.
 */
export const useOnRouteChange = (cb: () => void) => {
  const { pathname } = useLocation();
  const prevPath = useRef<Nullable<string>>(null);

  useEffect(() => {
    if (prevPath.current && pathname !== prevPath.current) cb();
    prevPath.current = pathname;
  }, [cb, pathname]);
};
