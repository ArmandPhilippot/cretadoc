import type { Maybe } from '@cretadoc/utils';
import type { DocFile, DocFileUpdate } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Update an existing documentation file.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocFileUpdate} data - The data to update.
 * @returns {Promise<Maybe<DocFile>>} The updated documentation file.
 */
export const updateDocFile = async (
  repository: DocRepository,
  data: DocFileUpdate
): Promise<Maybe<DocFile>> => repository.updateFile(data);
