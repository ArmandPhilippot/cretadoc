import type { Maybe } from '@cretadoc/utils';
import type { Loaders, Repositories } from '../types';
import { initPageLoaders } from './pages/pages.loaders';

/**
 * Initialize the loaders.
 *
 * @param repositories - The repositories.
 * @param [repositories.pages] - The page repository.
 * @returns {Maybe<Loaders>} The loaders.
 */
export const initLoaders = ({ pages }: Repositories): Maybe<Loaders> => {
  return {
    ...(pages ? initPageLoaders(pages) : {}),
  };
};
