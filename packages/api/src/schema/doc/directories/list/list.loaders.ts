import type { DocDirectory, ListInput, ListReturn } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Find documentation directories using list parameters.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {ListInput<DocDirectory>} params - The list parameters.
 * @returns {Promise<ListReturn<DocDirectory[]>>} The matching directories.
 */
export const listDocDirectories = async (
  repository: DocRepository,
  params: ListInput<DocDirectory>
): Promise<ListReturn<DocDirectory[]>> => repository.find(params, 'directory');
