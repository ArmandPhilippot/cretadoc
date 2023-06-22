import type { Maybe } from '@cretadoc/utils';
import type { PagesRepository } from '../../../repositories';
import type { Page, PageDeleteInput } from '../../../types';
import { MARKDOWN_EXTENSION } from '../../../utils/constants';
import { decodeBase64String } from '../../../utils/helpers';

/**
 * Delete an existing page.
 *
 * @param {PagesRepository} repository - The Pages repository.
 * @param {PageDeleteInput['input']} input - Either an id or a name.
 * @returns {Promise<Maybe<Page>>} The deleted page if found.
 */
export const deletePage = async (
  repository: PagesRepository,
  { id, name }: PageDeleteInput['input']
): Promise<Maybe<Page>> => {
  const path = id
    ? decodeBase64String(id)
    : name
    ? `./${name}${MARKDOWN_EXTENSION}`
    : '';

  return repository.remove(path);
};
