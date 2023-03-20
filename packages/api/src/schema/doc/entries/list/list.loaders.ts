import type { DocEntry, ListInput, ListReturn } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Find documentation entries using list parameters.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {ListInput<DocEntry>} params - The list parameters.
 * @returns {Promise<ListReturn<DocEntry[]>>} The matching entries.
 */
export const listDocEntries = async (
  repository: DocRepository,
  params: ListInput<DocEntry>
): Promise<ListReturn<DocEntry[]>> => repository.find(params);
