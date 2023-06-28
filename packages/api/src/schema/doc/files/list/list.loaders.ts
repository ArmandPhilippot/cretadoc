import type { DocRepository } from '../../../../repositories';
import type { DocFile, ListInput, ListReturn } from '../../../../types';

/**
 * Find documentation files using list parameters.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {ListInput<DocFile>} params - The list parameters.
 * @returns {Promise<ListReturn<DocFile[]>>} The matching files.
 */
export const loadDocFilesList = async (
  repository: DocRepository,
  params: ListInput<DocFile>
): Promise<ListReturn<DocFile[]>> => repository.find(params, 'file');
