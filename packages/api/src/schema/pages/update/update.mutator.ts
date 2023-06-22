import type { Maybe } from '@cretadoc/utils';
import type { PagesRepository } from '../../../repositories';
import type { Page, PageUpdate } from '../../../types';

/**
 * Update an existing page.
 *
 * @param {PagesRepository} repository - The Page repository.
 * @param {PageUpdate} data - The data to update.
 * @returns {Promise<Maybe<Page>>} The updated page.
 */
export const updatePage = async (
  repository: PagesRepository,
  data: PageUpdate
): Promise<Maybe<Page>> => repository.updatePage(data);
