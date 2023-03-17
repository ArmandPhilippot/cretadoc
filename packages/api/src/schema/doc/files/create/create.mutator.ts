import type { Maybe } from '@cretadoc/utils';
import type { DocFile, DocFileCreate } from '../../../../types';
import type { DocRepository } from '../../doc.repository';

/**
 * Create a new documentation file.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocFileCreate} data - The data to insert.
 * @returns {Promise<Maybe<DocFile>>} The inserted documentation file.
 */
export const createDocFile = async (
  repository: DocRepository,
  data: DocFileCreate
): Promise<Maybe<DocFile>> => repository.create(data);
