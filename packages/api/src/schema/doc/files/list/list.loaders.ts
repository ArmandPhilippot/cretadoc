import type { DocFile, ListInput, ListReturn } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Find documentation files using list parameters.
 *
 * @param {DocFilesRepository} repository - The Documentation repository.
 * @param {ListInput<DocFile>} params - The list parameters.
 * @returns {Promise<ListReturn<DocFile[]>>} The matching files.
 */
export const listDocFiles = async (
  repository: DocRepository,
  params: ListInput<DocFile>
): Promise<ListReturn<DocFile[]>> => repository.find('file', params);
