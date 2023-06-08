import { basename, parse } from 'path';
import { type Nullable, slugify } from '@cretadoc/utils';
import type { DocEntryParent } from '../../../src/types';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
import type { DocFileWithoutDates } from '../../types';
import { DOC_FIXTURES_DIR } from '../../utils/constants';

export const docFiles = docFixtures
  .filter((fileOrDir) => fileOrDir.path.endsWith(MARKDOWN_EXTENSION))
  .map((fileOrDir): DocFileWithoutDates => {
    const relativePath = fileOrDir.path.replace(DOC_FIXTURES_DIR, './');
    const parentPath = parse(relativePath).dir;
    const parent: Nullable<DocEntryParent> =
      parentPath === '.'
        ? null
        : {
            id: generateBase64String(parentPath),
            name: basename(parentPath),
            path: parentPath,
            slug: `/${slugify(basename(parentPath))}`,
          };

    return {
      contents: fileOrDir.contents,
      id: Buffer.from(relativePath).toString('base64'),
      name: parse(relativePath).name,
      parent,
      path: relativePath,
      slug: `/${slugify(parse(relativePath).name)}`,
      type: 'file',
    };
  });
