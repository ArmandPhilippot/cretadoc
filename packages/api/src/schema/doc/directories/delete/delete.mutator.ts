import type { Maybe } from '@cretadoc/utils';
import type { DocRepository } from '../../../../repositories';
import type { DocDirectory, DocDirectoryDeleteInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';

/**
 * Delete an existing documentation directory.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocDirectoryDeleteInput['input']} input - Either an id or a path.
 * @returns {Promise<Maybe<DocDirectory>>} The deleted doc directory if found.
 */
export const deleteDocDirectory = async (
  repository: DocRepository,
  { id, path }: DocDirectoryDeleteInput['input']
): Promise<Maybe<DocDirectory>> => {
  const relativePath = id ? decodeBase64String(id) : path ?? '';

  return repository.remove(relativePath, true);
};
