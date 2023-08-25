import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { DirectoryContents } from '@cretadoc/read-dir';
import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pagesFixtures } from '../../tests/fixtures/pages';
import {
  DOC_FIXTURES_DIR,
  PAGES_FIXTURES_DIR,
} from '../../tests/utils/constants';
import { createFixtures, deleteFixturesIn } from '../../tests/utils/helpers';
import type { APIDataConfig, ErrorDetails, Meta } from '../types';
import { EXCERPT_SEPARATOR, MARKDOWN_EXTENSION } from '../utils/constants';
import { CretadocAPIError } from '../utils/exceptions';
import { getDatetimeFormat } from '../utils/helpers';
import {
  type FileSystemData,
  FileSystemRepository,
} from './filesystem.repository';

class FileSystemRepositoryChild extends FileSystemRepository {
  public override getRootDir() {
    return super.getRootDir();
  }

  public override getAbsolutePathFrom(relativePath: string): string {
    return super.getAbsolutePathFrom(relativePath);
  }

  public override getRelativePathFrom(path: string): string {
    return super.getRelativePathFrom(path);
  }

  public override async getContentsOf(
    dir: string
  ): Promise<Maybe<DirectoryContents>> {
    return super.getContentsOf(dir);
  }

  public override async createMarkdownFile(
    props: FileSystemData
  ): Promise<string> {
    return super.createMarkdownFile(props);
  }

  public override async del(
    relativePath: string,
    isRecursive?: boolean | undefined
  ): Promise<void> {
    return super.del(relativePath, isRecursive);
  }

  public override async update(
    path: string,
    data: Partial<FileSystemData>
  ): Promise<string> {
    return super.update(path, data);
  }
}

/* eslint-disable max-statements */
describe('FileSystemRepository', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it('can create a new repository', () => {
    const path = '/some/absolute/path';
    const repository = new FileSystemRepositoryChild(path, '/pages/', 'pages');

    expect(repository.getRootDir()).toBe(path);
  });

  it('throws an error when the given path is not absolute', () => {
    const path = './path';
    const context: keyof APIDataConfig = 'doc';
    const expectedError: ErrorDetails = {
      errorKind: 'syntax',
      reason: `${context} directory must be an absolute path`,
      received: path,
    };

    expect(() => new FileSystemRepository(path, '/doc/', context)).toThrow(
      new CretadocAPIError(
        'Cannot initialize FileSystemRepository',
        expectedError
      )
    );
  });

  it('can return the contents of a given directory', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const repoContents = await repo.getContentsOf(PAGES_FIXTURES_DIR);

    expect(repoContents?.directories).not.toBeUndefined();
    expect(repoContents?.files).not.toBeUndefined();
    expect.assertions(2);
  });

  it('throws an error when requesting contents of an invalid directory', async () => {
    const context = 'pages';
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      context
    );

    await expect(async () =>
      repo.getContentsOf(DOC_FIXTURES_DIR)
    ).rejects.toThrow(
      new CretadocAPIError('Cannot get the directory contents', {
        errorKind: 'syntax',
        reason: `The given dir must be inside the ${context} directory`,
        received: DOC_FIXTURES_DIR,
      })
    );
    expect.assertions(1);
  });

  it('can create a new file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const parentPath = './';
    const filename = 'natus';
    const contents = 'adipisci quod odio';
    const creationDateTime = getDatetimeFormat(new Date());
    const [date, _time] = creationDateTime.split(' ');
    const filePath = await repo.createMarkdownFile({
      contents,
      name: filename,
      parentPath,
    });
    const createdFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(filePath).toBe(
      join(PAGES_FIXTURES_DIR, `${filename}${MARKDOWN_EXTENSION}`)
    );
    expect(createdFileContents).toContain(contents);
    if (date) expect(createdFileContents).toContain(date);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can create a new file with a full filename', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const parentPath = './';
    const filename = 'soluta.md';
    const contents = 'sit quia libero';
    const creationDateTime = getDatetimeFormat(new Date());
    const [date, _time] = creationDateTime.split(' ');
    const filePath = await repo.createMarkdownFile({
      contents,
      name: filename,
      parentPath,
    });
    const createdFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(filePath).toBe(join(PAGES_FIXTURES_DIR, filename));
    expect(createdFileContents).toContain(contents);
    if (date) expect(createdFileContents).toContain(date);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can rename a file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const parentPath = './';
    const filename = 'fugiat';
    const contents = 'adipisci quod odio';
    const filePath = await repo.createMarkdownFile({
      contents,
      name: filename,
      parentPath,
    });
    const newName = 'accusamus';
    const newPath = await repo.update(filePath, { name: newName });
    const renamedFileContents = await readFile(newPath, { encoding: 'utf8' });

    expect(newPath).toBe(
      join(PAGES_FIXTURES_DIR, `${newName}${MARKDOWN_EXTENSION}`)
    );
    expect(renamedFileContents).toContain(contents);
    expect(existsSync(filePath)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update a markdown file contents', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const filePath = await repo.createMarkdownFile({
      contents: 'adipisci quod odio',
      name: 'sit',
      parentPath: './',
    });
    const newContents = 'recusandae ipsam molestiae';
    const updateDateTime = getDatetimeFormat(new Date());
    const [date, _time] = updateDateTime.split(' ');
    const newPath = await repo.update(filePath, { contents: newContents });
    const updatedFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(newPath).toBe(filePath);
    expect(updatedFileContents).toContain(newContents);
    expect(updatedFileContents).toContain(date);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update a markdown file excerpt', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const contents = 'maiores non voluptatum';
    const filePath = await repo.createMarkdownFile({
      contents,
      excerpt: 'impedit aut sit',
      name: 'quis',
      parentPath: './',
    });
    const newExcerpt = 'est et natus';
    const updateDateTime = getDatetimeFormat(new Date());
    const [date, _time] = updateDateTime.split(' ');
    const newPath = await repo.update(filePath, { excerpt: newExcerpt });
    const updatedFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(newPath).toBe(filePath);
    expect(updatedFileContents).toContain(
      `${newExcerpt}${EXCERPT_SEPARATOR}${contents}`
    );
    expect(updatedFileContents).toContain(date);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update the frontmatter of a markdown file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const initialMeta: Meta = {
      title: 'et et nihil',
    };
    const filePath = await repo.createMarkdownFile({
      contents: 'aperiam omnis beatae',
      meta: initialMeta,
      name: 'eaque',
      parentPath: './',
    });
    const newMeta: Meta = {
      title: 'eum libero et',
    };
    const updateDateTime = getDatetimeFormat(new Date());
    const [date, _time] = updateDateTime.split(' ');
    await repo.update(filePath, { meta: newMeta });
    const updatedFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(updatedFileContents).not.toContain(initialMeta.title);
    expect(updatedFileContents).toContain(newMeta.title);
    expect(updatedFileContents).toContain(date);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can override a frontmatter meta in a markdown file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const initialMeta = {
      seoTitle: 'blanditiis quia porro',
      title: 'et et nihil',
    } satisfies Meta;
    const filePath = await repo.createMarkdownFile({
      contents: 'aperiam omnis beatae',
      meta: initialMeta,
      name: 'commodi',
      parentPath: './',
    });
    const newMeta = {
      seoTitle: '',
      status: 'draft',
    } satisfies Meta;
    await repo.update(filePath, { meta: newMeta });
    const updatedFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(updatedFileContents).not.toContain(
      `seoTitle: ${initialMeta.seoTitle}`
    );
    expect(updatedFileContents).toContain(`title: ${initialMeta.title}`);
    expect(updatedFileContents).toContain(`status: ${newMeta.status}`);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('throws an error when trying to update a non markdown file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const path = `${PAGES_FIXTURES_DIR}/any/path/without/extension`;

    await expect(async () =>
      repo.update(path, { contents: 'neque ut voluptas' })
    ).rejects.toThrow(
      new CretadocAPIError('Cannot update contents', {
        errorKind: 'syntax',
        reason: 'Only markdown file can be updated',
        received: path,
      })
    );
    expect.assertions(1);
  });

  it('can move a file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const filename = 'laudantium';
    const filePath = await repo.createMarkdownFile({
      contents: 'adipisci quod odio',
      name: filename,
      parentPath: './',
    });
    const newParentPath = `./quo`;

    await mkdir(join(PAGES_FIXTURES_DIR, newParentPath));
    const newPath = await repo.update(filePath, { parentPath: newParentPath });

    expect(newPath).toBe(
      join(
        PAGES_FIXTURES_DIR,
        newParentPath,
        `${filename}${MARKDOWN_EXTENSION}`
      )
    );
    expect(existsSync(newPath)).toBe(true);
    expect(existsSync(filePath)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can delete a file', async () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const parentPath = './';
    const filename = 'minima';
    const filePath = await repo.createMarkdownFile({
      name: filename,
      parentPath,
    });

    await repo.del(filePath.replace(PAGES_FIXTURES_DIR, './'));

    expect(existsSync(filePath)).toBe(false);
    expect.assertions(1);
  });

  it('throws an error when trying to convert an absolute path to an absolute path', () => {
    const repo = new FileSystemRepositoryChild(
      PAGES_FIXTURES_DIR,
      '/pages/',
      'pages'
    );
    const path = '/an/absolute/path';

    expect(() => repo.getAbsolutePathFrom(path)).toThrowError(
      new CretadocAPIError('Cannot get absolute path', {
        errorKind: 'syntax',
        reason: 'Must be a relative path',
        received: path,
      })
    );
  });
});
/* eslint-enable max-statements */
