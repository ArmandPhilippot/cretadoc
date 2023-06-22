import type { Maybe } from '@cretadoc/utils';
import type { DocRepository } from '../../../../repositories';
import type { DocFile, DocFileDeleteInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';

/**
 * Delete an existing documentation file.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocFileDeleteInput['input']} input - Either an id or a path.
 * @returns {Promise<Maybe<DocFile>>} The deleted doc file if found.
 */
export const deleteDocFile = async (
  repository: DocRepository,
  { id, path }: DocFileDeleteInput['input']
): Promise<Maybe<DocFile>> => {
  const relativePath = id ? decodeBase64String(id) : path ?? '';

  return repository.remove(relativePath);
};
