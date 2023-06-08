import { parse } from 'path';
import { slugify } from '@cretadoc/utils';
import { pagesFixtures } from '../../fixtures/pages';
import type { PageWithoutDates } from '../../types';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';

export const pages = pagesFixtures.map((page): PageWithoutDates => {
  const relativePath = page.path.replace(PAGES_FIXTURES_DIR, './');
  const { name } = parse(relativePath);

  return {
    contents: page.contents,
    id: Buffer.from(relativePath).toString('base64'),
    name,
    path: relativePath,
    slug: `/${slugify(name)}`,
  };
});
