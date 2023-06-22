import type { Maybe } from '@cretadoc/utils';
import type { DocRepository } from '../../../../repositories';
import type { DocDirectory, DocDirectoryUpdate } from '../../../../types';

/**
 * Update an existing documentation directory.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocDirectoryUpdate} data - The data to update.
 * @returns {Promise<Maybe<DocDirectory>>} The updated documentation directory.
 */
export const updateDocDirectory = async (
  repository: DocRepository,
  data: DocDirectoryUpdate
): Promise<Maybe<DocDirectory>> => repository.updateDirectory(data);
