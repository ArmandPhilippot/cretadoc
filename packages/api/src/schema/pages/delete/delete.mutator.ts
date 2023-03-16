import type { Maybe } from '@cretadoc/utils';
import type { Page, PageDeleteInput } from '../../../types';
import { MARKDOWN_EXTENSION } from '../../../utils/constants';
import { decodeBase64String } from '../../../utils/helpers';
import type { PagesRepository } from '../pages.repository';

/**
 * Delete an existing page.
 *
 * @param {PagesRepository} repository - The Pages repository.
 * @param {PageDeleteInput['input']} input - Either an id or a name.
 * @returns {Promise<Maybe<Page>>}
 */
export const deletePage = async (
  repository: PagesRepository,
  { id, name }: PageDeleteInput['input']
): Promise<Maybe<Page>> => {
  let page: Maybe<Page> = undefined;
  let path = '';

  if (id) {
    page = await repository.get('id', id);
    path = decodeBase64String(id);
  } else if (name) {
    page = await repository.get('name', name);
    path = `./${name}${MARKDOWN_EXTENSION}`;
  }

  await repository.del(path);

  return page;
};
