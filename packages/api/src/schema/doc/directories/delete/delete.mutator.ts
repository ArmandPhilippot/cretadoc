import type { Maybe } from '@cretadoc/utils';
import type { DocDirectory, DocDirectoryDeleteInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';
import type { DocRepository } from '../../doc.repository';

/**
 * Delete an existing documentation directory.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocDirectoryDeleteInput['input']} input - Either an id or a path.
 * @returns {Promise<Maybe<DocDirectory>>}
 */
export const deleteDocDirectory = async (
  repository: DocRepository,
  { id, path }: DocDirectoryDeleteInput['input']
): Promise<Maybe<DocDirectory>> => {
  let directory: Maybe<DocDirectory> = undefined;
  let relativePath = path ?? '';

  if (id) {
    directory = await repository.getDirectory('id', id);
    relativePath = decodeBase64String(id);
  } else if (path) directory = await repository.getDirectory('path', path);

  await repository.del(relativePath, true);

  return directory;
};
