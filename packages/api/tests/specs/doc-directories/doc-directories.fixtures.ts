import { basename, parse } from 'path';
import { generateBase64String } from '../../../src/utils/helpers';
import { docFixtures } from '../../fixtures/doc';
import type { DocDirectoryWithoutDatesAndContents } from '../../types';
import { DOC_FIXTURES_DIR } from '../../utils/constants';

const onlyDocDirectories = docFixtures
  .map((fileOrDir): DocDirectoryWithoutDatesAndContents => {
    const relativePath = fileOrDir.path.replace(DOC_FIXTURES_DIR, './');
    const dirPath = parse(relativePath).dir;
    const parentPath = parse(dirPath).dir;
    const parent =
      parentPath === '.'
        ? null
        : {
            id: generateBase64String(parentPath),
            name: basename(parentPath),
            path: parentPath,
          };

    return {
      id: Buffer.from(dirPath).toString('base64'),
      name: parse(dirPath).name,
      parent,
      path: dirPath,
      type: 'directory',
    };
  })
  .filter((dir) => dir.path !== '.');

const getUniqueListBy = (
  arr: DocDirectoryWithoutDatesAndContents[],
  key: keyof DocDirectoryWithoutDatesAndContents
) => [...new Map(arr.map((item) => [item[key], item])).values()];

export const docDirectories = getUniqueListBy(onlyDocDirectories, 'id');
