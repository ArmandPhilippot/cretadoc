import { parse } from 'path';
import { slugify } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  docFixtures,
  rootDocDirectories,
  rootDocEntries,
  rootDocFiles,
} from '../../tests/fixtures/doc';
import { DOC_FIXTURES_DIR } from '../../tests/utils/constants';
import { createFixtures, deleteFixturesIn } from '../../tests/utils/helpers';
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

  it('can find a list of documentation entries', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({ first: DEFAULT_EDGES_NUMBER });

    expect(edges.data?.length).toBe(rootDocEntries.length);
    expect(edges.total).toBe(
      rootDocEntries.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : rootDocEntries.length
    );
    expect.assertions(2);
  });

  it('can find a list of documentation files', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const edges = await repo.find({ first: DEFAULT_EDGES_NUMBER }, 'file');

    expect(edges.data?.length).toBe(rootDocFiles.length);
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

    expect(edges.data?.length).toBe(rootDocDirectories.length);
    expect(edges.total).toBe(
      rootDocDirectories.length > DEFAULT_EDGES_NUMBER
        ? DEFAULT_EDGES_NUMBER
        : rootDocDirectories.length
    );
    expect.assertions(2);
  });

  it('can remove an entry', async () => {
    const repo = new DocRepository(DOC_FIXTURES_DIR);
    const docFileName = 'incidunt';
    const docFileContents = 'a aliquid omnis';
    const docFile = await repo.createFile({
      name: docFileName,
      contents: docFileContents,
    });
    const deletedDocFile = await repo.remove(docFile?.path ?? '');

    expect(deletedDocFile).toStrictEqual(docFile);
    expect.assertions(1);
  });
});
/* eslint-enable max-statements */
