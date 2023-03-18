import type { Maybe } from '@cretadoc/utils';
import type { DocDirectory, DocDirectoryCreate } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Create a new documentation directory.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocDirectoryCreate} data - The data to insert.
 * @returns {Promise<Maybe<DocDirectory>>} The inserted documentation directory.
 */
export const createDocDirectory = async (
  repository: DocRepository,
  data: DocDirectoryCreate
): Promise<Maybe<DocDirectory>> => repository.createDirectory(data);
