import type { Maybe } from '@cretadoc/utils';
import type { PagesRepository } from '../../../repositories';
import type { Page, PageCreate } from '../../../types';

/**
 * Create a new page.
 *
 * @param {PagesRepository} repository - The Page repository.
 * @param {PageCreate} data - The data to insert.
 * @returns {Promise<Maybe<Page>>} The inserted page.
 */
export const createPage = async (
  repository: PagesRepository,
  data: PageCreate
): Promise<Maybe<Page>> => repository.create(data);
