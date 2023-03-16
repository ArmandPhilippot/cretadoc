import { basename, parse } from 'path';
import { MARKDOWN_EXTENSION } from '../../../src/utils/constants';
import { generateBase64String } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
import type { DocEntryWithoutDatesAndType } from '../../types';
import { DOC_FIXTURES_DIR } from '../../utils/constants';

export const docFiles = docFixtures
  .filter((fileOrDir) => fileOrDir.path.endsWith(MARKDOWN_EXTENSION))
  .map((fileOrDir): DocEntryWithoutDatesAndType => {
    const relativePath = fileOrDir.path.replace(DOC_FIXTURES_DIR, './');
    const parentPath = parse(relativePath).dir;
    const parent =
      parentPath === '.'
        ? null
        : {
            id: generateBase64String(parentPath),
            name: basename(parentPath),
            path: parentPath,
          };

    return {
      content: fileOrDir.content,
      id: Buffer.from(relativePath).toString('base64'),
      name: parse(relativePath).name,
      parent,
      path: relativePath,
    };
  });
