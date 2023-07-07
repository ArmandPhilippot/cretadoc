import { describe, expect, it } from 'vitest';
import { DOC_FIXTURES_DIR } from '../../../../tests/utils/constants';
import { DocRepository } from '../../../repositories';
import { generateBase64String } from '../../../utils/helpers';
import { initDocDirectoryLoaders } from './directories.loaders';

describe('init-doc-directory-loaders', () => {
  it('returns the doc directory loaders', () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocDirectoryLoaders(repository);

    expect(loaders.directory).not.toBeUndefined();
    expect(loaders.directory.byId).not.toBeUndefined();
    expect(loaders.directory.byPath).not.toBeUndefined();
    expect(loaders.directory.bySlug).not.toBeUndefined();
    expect(loaders.directory.list).not.toBeUndefined();
  });

  it('returns a method to load doc directory by id', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocDirectoryLoaders(repository);

    const id = generateBase64String('./eum');
    const directory = await loaders.directory.byId.load(id);

    expect(directory).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc directory by path', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocDirectoryLoaders(repository);

    const path = './unde';
    const directory = await loaders.directory.byPath.load(path);

    expect(directory).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc directory by slug', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocDirectoryLoaders(repository);

    const slug = '/veniam';
    const directory = await loaders.directory.bySlug.load(slug);

    expect(directory).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load a list of doc directories', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocDirectoryLoaders(repository);

    const directories = await loaders.directory.list();

    expect(directories).toStrictEqual([]);

    expect.assertions(1);
  });
});
