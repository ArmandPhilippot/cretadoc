import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import type { DirectoryContents } from '@cretadoc/read-dir';
import type { Maybe } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pagesFixtures } from '../../tests/fixtures/pages';
import {
  DOC_FIXTURES_DIR,
  PAGES_FIXTURES_DIR,
} from '../../tests/utils/constants';
import { createFixtures, deleteFixturesIn } from '../../tests/utils/helpers';
import type { APIDataConfig, ErrorDetails } from '../types';
import { MARKDOWN_EXTENSION } from '../utils/constants';
import { CretadocAPIError } from '../utils/exceptions';
import { FileSystemRepository } from './filesystem.repository';

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

  public override async createMarkdownFile(props: {
    contents?: string;
    name: string;
    parentPath?: string;
  }): Promise<string> {
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
    {
      contents,
      name,
      parentPath,
    }: Partial<{
      contents?: string;
      name: string;
      parentPath?: string;
    }>
  ): Promise<string> {
    return super.update(path, { contents, name, parentPath });
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
    const repository = new FileSystemRepositoryChild(path, 'pages');

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

    expect(() => new FileSystemRepository(path, context)).toThrow(
      new CretadocAPIError(
        'Cannot initialize FileSystemRepository',
        expectedError
      )
    );
  });

  it('can return the contents of a given directory', async () => {
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
    const repoContents = await repo.getContentsOf(PAGES_FIXTURES_DIR);

    expect(repoContents?.directories).not.toBeUndefined();
    expect(repoContents?.files).not.toBeUndefined();
    expect.assertions(2);
  });

  it('throws an error when requesting contents of an invalid directory', async () => {
    const context = 'pages';
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, context);

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
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
    const parentPath = './';
    const filename = 'natus';
    const contents = 'adipisci quod odio';
    const filePath = await repo.createMarkdownFile({
      contents,
      name: filename,
      parentPath,
    });
    const createdFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(filePath).toBe(
      join(PAGES_FIXTURES_DIR, `${filename}${MARKDOWN_EXTENSION}`)
    );
    expect(createdFileContents).toBe(contents);
    expect.assertions(2);
  });

  it('can create a new file with a full filename', async () => {
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
    const parentPath = './';
    const filename = 'soluta.md';
    const contents = 'sit quia libero';
    const filePath = await repo.createMarkdownFile({
      contents,
      name: filename,
      parentPath,
    });
    const createdFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(filePath).toBe(join(PAGES_FIXTURES_DIR, filename));
    expect(createdFileContents).toBe(contents);
    expect.assertions(2);
  });

  it('can rename a file', async () => {
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
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
    expect(renamedFileContents).toBe(contents);
    expect(existsSync(filePath)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update a markdown file contents', async () => {
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
    const filePath = await repo.createMarkdownFile({
      contents: 'adipisci quod odio',
      name: 'sit',
      parentPath: './',
    });
    const newContents = 'recusandae ipsam molestiae';
    const newPath = await repo.update(filePath, { contents: newContents });
    const updatedFileContents = await readFile(filePath, { encoding: 'utf8' });

    expect(newPath).toBe(filePath);
    expect(updatedFileContents).toBe(newContents);
    expect.assertions(2);
  });

  it('throws an error when trying to update a non markdown file', async () => {
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
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
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
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
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
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
    const repo = new FileSystemRepositoryChild(PAGES_FIXTURES_DIR, 'pages');
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
