import type { Maybe } from '@cretadoc/utils';
import type { DocFile, DocFileDeleteInput } from '../../../../types';
import { decodeBase64String } from '../../../../utils/helpers';
import type { DocRepository } from '../../doc.repository';

/**
 * Delete an existing documentation file.
 *
 * @param {DocRepository} repository - The Documentation repository.
 * @param {DocFileDeleteInput['input']} input - Either an id or a path.
 * @returns {Promise<Maybe<DocFile>>}
 */
export const deleteDocFile = async (
  repository: DocRepository,
  { id, path }: DocFileDeleteInput['input']
): Promise<Maybe<DocFile>> => {
  let file: Maybe<DocFile> = undefined;
  let relativePath = path ?? '';

  if (id) {
    file = await repository.getFile('id', id);
    relativePath = decodeBase64String(id);
  } else if (path) file = await repository.getFile('path', path);

  await repository.del(relativePath);

  return file;
};
