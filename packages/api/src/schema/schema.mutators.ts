import type { Maybe } from '@cretadoc/utils';
import type { Mutators, Repositories } from '../types';
import { initPageMutators } from './pages/pages.mutators';

/**
 * Initialize the mutators.
 *
 * @param repositories - The repositories.
 * @param [repositories.pages] - The page repository.
 * @returns {Maybe<Loaders>} The mutators.
 */
export const initMutators = ({ pages }: Repositories): Maybe<Mutators> => {
  return {
    ...(pages ? initPageMutators(pages) : {}),
  };
};
