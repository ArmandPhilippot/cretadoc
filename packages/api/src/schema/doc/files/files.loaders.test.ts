import { describe, expect, it } from 'vitest';
import { DOC_FIXTURES_DIR } from '../../../../tests/utils/constants';
import { DocRepository } from '../../../repositories';
import { generateBase64String } from '../../../utils/helpers';
import { initDocFileLoaders } from './files.loaders';

describe('init-doc-file-loaders', () => {
  it('returns the doc file loaders', () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocFileLoaders(repository);

    expect(loaders.file).not.toBeUndefined();
    expect(loaders.file.byId).not.toBeUndefined();
    expect(loaders.file.byPath).not.toBeUndefined();
    expect(loaders.file.bySlug).not.toBeUndefined();
    expect(loaders.file.list).not.toBeUndefined();
  });

  it('returns a method to load doc file by id', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocFileLoaders(repository);

    const id = generateBase64String('./eum');
    const file = await loaders.file.byId.load(id);

    expect(file).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc file by path', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocFileLoaders(repository);

    const path = './unde';
    const file = await loaders.file.byPath.load(path);

    expect(file).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc file by slug', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocFileLoaders(repository);

    const slug = '/veniam';
    const file = await loaders.file.bySlug.load(slug);

    expect(file).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load a list of doc files', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocFileLoaders(repository);

    const files = await loaders.file.list();

    expect(files).toStrictEqual([]);

    expect.assertions(1);
  });
});
