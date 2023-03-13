import type { ListInput, ListReturn, Page } from '../../../types';
import type { PagesRepository } from '../pages.repository';

/**
 * Find pages using list parameters.
 *
 * @param {PagesRepository} repository - The Pages repository.
 * @param {ListInput<Page>} params - The list parameters.
 * @returns {Promise<ListReturn<Page[]>>} The matching pages.
 */
export const listPages = async (
  repository: PagesRepository,
  params: ListInput<Page>
): Promise<ListReturn<Page[]>> => repository.find(params);
