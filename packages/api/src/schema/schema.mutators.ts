import type { Maybe } from '@cretadoc/utils';
import type { Mutators, Repositories } from '../types';
import { initDocMutators } from './doc/doc.mutators';
import { initPageMutators } from './pages/pages.mutators';

/**
 * Initialize the mutators.
 *
 * @param repositories - The repositories.
 * @param [repositories.doc] - The documentation repository.
 * @param [repositories.pages] - The page repository.
 * @returns {Maybe<Loaders>} The mutators.
 */
export const initMutators = ({ doc, pages }: Repositories): Maybe<Mutators> => {
  return {
    ...(doc ? initDocMutators(doc) : {}),
    ...(pages ? initPageMutators(pages) : {}),
  };
};
