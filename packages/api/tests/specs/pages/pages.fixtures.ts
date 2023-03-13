import { parse } from 'path';
import { pagesFixtures } from '../../fixtures/pages';
import type { PageWithoutDates } from '../../types';
import { PAGES_FIXTURES_DIR } from '../../utils/constants';

export const pages = pagesFixtures.map((page): PageWithoutDates => {
  const relativePath = page.path.replace(PAGES_FIXTURES_DIR, './');

  return {
    content: page.content,
    id: Buffer.from(relativePath).toString('base64'),
    name: parse(relativePath).name,
    path: relativePath,
  };
});
