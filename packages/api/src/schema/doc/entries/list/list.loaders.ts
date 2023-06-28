import type { DocRepository } from '../../../../repositories';
import type { DocEntry, ListInput, ListReturn } from '../../../../types';

/**
 * Find documentation entries using list parameters.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {ListInput<DocEntry>} params - The list parameters.
 * @returns {Promise<ListReturn<DocEntry[]>>} The matching entries.
 */
export const loadDocEntriesList = async (
  repository: DocRepository,
  params: ListInput<DocEntry>
): Promise<ListReturn<DocEntry[]>> => repository.find(params);
