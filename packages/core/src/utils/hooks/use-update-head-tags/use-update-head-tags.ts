import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateMetaTags } from '../../client';
import { loadMetadata } from '../../shared';
import { useConfig } from '../use-config';

/**
 * Update the meta tags in document head when the route changes.
 */
export const useUpdateHeadTags = () => {
  const config = useConfig();
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(pathname, window.location.origin).href;

    loadMetadata(url, config)
      .then(updateMetaTags)
      .catch((err) => console.error(err));
  }, [config, pathname]);
};
