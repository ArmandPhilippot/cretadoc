import { basename, join, parse, sep } from 'path';
import type { Nullable } from '@cretadoc/utils';
import type { DocEntryParent } from '../../src';
import { MARKDOWN_EXTENSION } from '../../src/utils/constants';
import {
  byNameProp,
  generateBase64String,
  getSlugFrom,
} from '../../src/utils/helpers';
import { DOC_FIXTURES_DIR } from '../utils/constants';
import type { Fixture } from '../utils/helpers';

export const docFixtures: Fixture[] = [
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './engineer_michigan.vtu'),
  },
  {
    contents:
      'Velit voluptas consequatur ut unde molestiae autem. Ut labore sint eveniet maxime. Ullam ipsa ea modi. Facilis maxime laborum dolorem alias deleniti omnis. Dolorem rerum dicta sint temporibus ut sed.',
    path: join(DOC_FIXTURES_DIR, './haptic.txt'),
  },
  {
    contents:
      '# Schemas redundant\n\nQuo et dolorem aut debitis. Dolorum repellendus rerum sapiente molestiae ut at rerum voluptates omnis. Eum numquam ab.',
    path: join(DOC_FIXTURES_DIR, './schemas-redundant.md'),
  },
  {
    contents: '',
    path: join(
      DOC_FIXTURES_DIR,
      './excepturi/doloremque/valley-rubber-standardization.md'
    ),
  },
  {
    contents:
      '# Generate yellow invoice\n\nPerferendis qui accusamus temporibus culpa facere eius perspiciatis unde quam. Enim maxime sit ut quis ducimus aut. Dignissimos in explicabo aut ut voluptas consequatur ex. Omnis molestiae rem amet. Provident aut magnam iste vero inventore. Architecto assumenda id et cumque ab maxime.',
    path: join(DOC_FIXTURES_DIR, './excepturi/generate-yellow-invoice.md'),
  },
  {
    contents: '# Eum asperiores repudiandae',
    path: join(DOC_FIXTURES_DIR, './autem/eum-asperiores-repudiandae.md'),
  },
  {
    contents: '# Est iusto id',
    path: join(DOC_FIXTURES_DIR, './autem/est-iusto-id.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './autem/voluptas-non-nihil.md'),
  },
  {
    contents: '# Possimus nostrum sed',
    path: join(DOC_FIXTURES_DIR, './rerum/possimus-nostrum-sed.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './saepe/dolorem-quibusdam-quas.txt'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './sit/sit-deserunt-dolorem.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './cumque/minus-exercitationem-deleniti.md'),
  },
];

export const docFiles = docFixtures
  .filter((fileOrDir) => fileOrDir.path.endsWith(MARKDOWN_EXTENSION))
  .map((fileOrDir) => {
    const relativePath = fileOrDir.path.replace(DOC_FIXTURES_DIR, './');
    const parentPath = parse(relativePath).dir;
    const parent: Nullable<DocEntryParent> =
      parentPath === '.'
        ? null
        : {
            id: generateBase64String(parentPath),
            name: basename(parentPath),
            path: parentPath,
            slug: getSlugFrom(parentPath),
          };

    return {
      contents: fileOrDir.contents,
      id: Buffer.from(relativePath).toString('base64'),
      name: parse(relativePath).name,
      parent,
      path: relativePath,
      slug: getSlugFrom(relativePath),
      type: 'file' as const,
    };
  });

const onlyDocDirectories = docFixtures
  .map((fileOrDir) => {
    const relativePath = fileOrDir.path.replace(DOC_FIXTURES_DIR, './');
    const dirPath = parse(relativePath).dir;
    const parentPath = parse(dirPath).dir;
    const parent: Nullable<DocEntryParent> =
      parentPath === '.'
        ? null
        : {
            id: generateBase64String(parentPath),
            name: basename(parentPath),
            path: parentPath,
            slug: getSlugFrom(parentPath),
          };

    return {
      id: Buffer.from(dirPath).toString('base64'),
      name: parse(dirPath).name,
      parent,
      path: dirPath,
      slug: getSlugFrom(dirPath),
      type: 'directory' as const,
    };
  })
  .filter((dir) => dir.path !== '.');

const getUniqueListBy = (
  arr: typeof onlyDocDirectories,
  key: keyof (typeof onlyDocDirectories)[number]
) => [...new Map(arr.map((item) => [item[key], item])).values()];

export const docDirectories = getUniqueListBy(onlyDocDirectories, 'id');

export const docEntries = [...docDirectories, ...docFiles];

export const rootDocFiles = [...docFiles]
  .sort(byNameProp)
  .filter((file) => file.path.replace('./', '').split(sep).length === 1);

export const rootDocDirectories = [...docDirectories]
  .sort(byNameProp)
  .filter((dir) => dir.path.replace('./', '').split(sep).length === 1);

export const rootDocEntries = [...docEntries]
  .sort(byNameProp)
  .filter((entry) => entry.path.replace('./', '').split(sep).length === 1);
