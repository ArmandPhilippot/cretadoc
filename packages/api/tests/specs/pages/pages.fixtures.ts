import { parse } from 'path';
import { pagesFixtures } from '../../fixtures/pages';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';
import type { PageWithoutDates } from '../../utils/types';

export const pages = pagesFixtures.map((page): PageWithoutDates => {
  const relativePath = page.path.replace(PAGES_FIXTURES_DIR, './');

  return {
    content: page.content,
    id: Buffer.from(relativePath).toString('base64'),
    name: parse(relativePath).name,
    path: relativePath,
  };
});
