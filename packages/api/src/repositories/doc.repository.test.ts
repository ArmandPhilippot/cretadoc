import { parse } from 'path';
import { type Maybe, slugify } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  docEntries,
  docFixtures,
  rootDocDirectories,
  rootDocEntries,
  rootDocFiles,
} from '../../tests/fixtures/doc';
import { DOC_FIXTURES_DIR } from '../../tests/utils/constants';
import { createFixtures, deleteFixturesIn } from '../../tests/utils/helpers';
import type { DocDirectory, Meta } from '../types';
import { DEFAULT_EDGES_NUMBER, MARKDOWN_EXTENSION } from '../utils/constants';
import { generateBase64String } from '../utils/helpers';
import { DocRepository } from './doc.repository';

/* eslint-disable max-statements */
describe('DocRepository', () => {
  beforeAll(async () => {
    await createFixtures(docFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
  });

  it('can get a documentation file by path', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileFixture = docFixtures.find((fixture) =>
      fixture.path.endsWith(MARKDOWN_EXTENSION)
    );
    const docFilePath = docFileFixture?.path ?? '';
    const docFileName = parse(docFilePath).name;
    const relativePath = docFilePath.replace(DOC_FIXTURES_DIR, './');
    const docFile = await repo.get('path', relativePath);

    expect(docFile?.name).toBe(docFileName);
    expect(docFile?.contents).toBe(docFileFixture?.contents);
    expect(docFile?.path).toBe(relativePath);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can get a documentation file by id', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileFixture = docFixtures.find((fixture) =>
      fixture.path.endsWith(MARKDOWN_EXTENSION)
    );
    const docFilePath = docFileFixture?.path ?? '';
    const relativePath = docFilePath.replace(DOC_FIXTURES_DIR, './');
    const docFileId = generateBase64String(relativePath);
    const docFile = await repo.get('id', docFileId);

    expect(docFile?.path).toBe(relativePath);
    expect(docFile?.contents).toBe(docFileFixture?.contents);
    expect(docFile?.id).toBe(docFileId);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can get a documentation file by slug', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileFixture = docFixtures.find((fixture) =>
      fixture.path.endsWith(MARKDOWN_EXTENSION)
    );
    const docFilePath = docFileFixture?.path ?? '';
    const docFileName = parse(docFilePath).name;
    const slug = `/${slugify(docFileName)}` as const;
    const docFile = await repo.get('slug', slug);

    expect(docFile?.path).toBe(docFilePath.replace(DOC_FIXTURES_DIR, './'));
    expect(docFile?.name).toBe(docFileName);
    expect(docFile?.slug).toBe(slug);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can get many documentation files by slug', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileFixture = docFixtures.find((fixture) =>
      fixture.path.endsWith(MARKDOWN_EXTENSION)
    );
    const docFilePath = docFileFixture?.path ?? '';
    const docFileName = parse(docFilePath).name;
    const slug = `/${slugify(docFileName)}` as const;
    const docFiles = await repo.getMany('slug', [slug], 'file');

    expect(docFiles?.length).toBe(1);
    expect(docFiles?.every((file) => file.slug.startsWith(slug))).toBe(true);
    expect.assertions(2);
  });

  it('can get many documentation entries by path', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    // An existing directory.
    const path = './excepturi';
    const requestedDocEntries = await repo.getMany('path', [path]);

    expect(requestedDocEntries?.length).toBe(1);
    expect(requestedDocEntries?.every((entry) => entry.path === path)).toBe(
      true
    );
    expect.assertions(2);
  });

  it('can find a list of documentation entries', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({ first: DEFAULT_EDGES_NUMBER });

    expect(edges.data.length).toBe(rootDocEntries.length);
    expect(edges.total).toBe(
      rootDocEntries.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : rootDocEntries.length
    );
    expect.assertions(2);
  });

  it('can find a list of documentation entries in the given path', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    // An existing directory.
    const parentPath = './excepturi';
    const requestedFixtures = docEntries.filter(
      (page) => page.parent?.path === parentPath
    );
    const edges = await repo.find({
      first: DEFAULT_EDGES_NUMBER,
      where: { path: parentPath },
    });

    expect(edges.data.length).toBe(
      requestedFixtures.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : requestedFixtures.length
    );
    expect(edges.total).toBe(requestedFixtures.length);
    expect.assertions(2);
  });

  it('can find a list of documentation entries ordered by path', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({
      first: DEFAULT_EDGES_NUMBER,
      orderBy: { direction: 'DESC', field: 'path' },
    });
    const reversedRootDocEntriesPaths = rootDocEntries
      .slice(0, DEFAULT_EDGES_NUMBER)
      .map((page) => page.path)
      .reverse();
    const receivedPaths = edges.data.map((edge) => edge.path);

    expect(receivedPaths).toStrictEqual(reversedRootDocEntriesPaths);
    expect.assertions(1);
  });

  it('can find a list of documentation files', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({ first: DEFAULT_EDGES_NUMBER }, 'file');

    expect(edges.data.length).toBe(rootDocFiles.length);
    expect(edges.total).toBe(
      rootDocFiles.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : rootDocFiles.length
    );
    expect.assertions(2);
  });

  it('can find a list of documentation directories', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({ first: DEFAULT_EDGES_NUMBER }, 'directory');

    expect(edges.data.length).toBe(rootDocDirectories.length);
    expect(edges.total).toBe(
      rootDocDirectories.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : rootDocDirectories.length
    );
    expect.assertions(2);
  });

  it('can remove a file by path', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileName = 'incidunt';
    const docFileContents = 'a aliquid omnis';
    const docFile = await repo.createFile({
      name: docFileName,
      contents: docFileContents,
    });
    const deletedDocFile = await repo.remove({ path: docFile?.path });

    expect(deletedDocFile).toStrictEqual(docFile);
    expect.assertions(1);
  });

  it('can remove a file by id', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileName = 'asperiores';
    const docFileContents = 'ut ut ut';
    const docFile = await repo.createFile({
      name: docFileName,
      contents: docFileContents,
    });
    const deletedDocFile = await repo.remove({ id: docFile?.id });

    expect(deletedDocFile).toStrictEqual(docFile);
    expect.assertions(1);
  });

  it('can update a file', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileName = 'dolorem blanditiis ipsam';
    const docFileContents = 'delectus dolorem ut';
    const docFile = await repo.createFile({
      name: docFileName,
      contents: docFileContents,
    });

    if (docFile) {
      const newDocFileName = 'eligendi';
      const updatedDocFile = await repo.updateFile({
        id: docFile.id,
        name: newDocFileName,
      });

      expect(updatedDocFile?.id).not.toBe(docFile.id);
      expect(updatedDocFile?.name).not.toBe(docFile.name);
      expect(updatedDocFile?.name).toBe(newDocFileName);
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can create a directory with meta', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const dirName = 'veritatis';
    const meta = {
      status: 'published',
      title: 'Voluptatem quia nobis',
    } satisfies Meta;

    const dir = await repo.createDirectory({ name: dirName, meta });

    expect(dir).not.toBeUndefined();
    expect(dir?.name).toBe(dirName);
    expect(dir?.meta).toContain(meta);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update the meta of a directory', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const dirName = 'provident';
    const meta = {
      status: 'draft',
      title: 'A minima quia',
    } satisfies Meta;

    const dir = await repo.createDirectory({ name: dirName, meta });
    const newMeta = {
      status: 'published',
      title: 'Iure natus officiis',
    } satisfies Meta;
    let updatedDir: Maybe<DocDirectory> = undefined;

    if (dir?.id)
      updatedDir = await repo.updateDirectory({ id: dir.id, meta: newMeta });

    expect(updatedDir).not.toBeUndefined();
    expect(updatedDir?.id).toBe(dir?.id);
    expect(updatedDir?.meta).not.toContain(meta);
    expect(updatedDir?.meta).toContain(newMeta);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);
  });

  it('can retrieve the meta of a parent directory', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const parentName = 'delectus';
    const parentMeta = {
      status: 'published',
      title: 'Delectus consequatur enim',
    } satisfies Meta;

    const parentDir = await repo.createDirectory({
      name: parentName,
      meta: parentMeta,
    });

    const childName = 'aut';
    const childDir = await repo.createDirectory({
      name: childName,
      parentPath: parentDir?.path,
    });

    expect(childDir).not.toBeUndefined();
    expect(childDir?.name).toBe(childName);
    expect(childDir?.parent?.name).toContain(parentName);
    expect(childDir?.parent?.meta).toContain(parentMeta);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);
  });
});
/* eslint-enable max-statements */
