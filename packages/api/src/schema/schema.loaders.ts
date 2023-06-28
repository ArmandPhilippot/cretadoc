import type { Maybe } from '@cretadoc/utils';
import type { Loaders, Repositories } from '../types';
import { initDocLoaders } from './doc';
import { initPageLoaders } from './pages';

/**
 * Initialize the loaders.
 *
 * @param repositories - The repositories.
 * @param [repositories.doc] - The documentation repository.
 * @param [repositories.pages] - The page repository.
 * @returns {Maybe<Loaders>} The loaders.
 */
export const initLoaders = ({ doc, pages }: Repositories): Maybe<Loaders> => {
  return {
    ...(doc ? initDocLoaders(doc) : {}),
    ...(pages ? initPageLoaders(pages) : {}),
  };
};
