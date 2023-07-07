import { describe, expect, it } from 'vitest';
import { DOC_FIXTURES_DIR } from '../../../../tests/utils/constants';
import { DocRepository } from '../../../repositories';
import { generateBase64String } from '../../../utils/helpers';
import { initDocEntryLoaders } from './entries.loaders';

describe('init-doc-entry-loaders', () => {
  it('returns the doc entry loaders', () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocEntryLoaders(repository);

    expect(loaders.entry).not.toBeUndefined();
    expect(loaders.entry.byId).not.toBeUndefined();
    expect(loaders.entry.byPath).not.toBeUndefined();
    expect(loaders.entry.bySlug).not.toBeUndefined();
    expect(loaders.entry.list).not.toBeUndefined();
  });

  it('returns a method to load doc entry by id', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocEntryLoaders(repository);

    const id = generateBase64String('./eum');
    const entry = await loaders.entry.byId.load(id);

    expect(entry).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc entry by path', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocEntryLoaders(repository);

    const path = './unde';
    const entry = await loaders.entry.byPath.load(path);

    expect(entry).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load doc entry by slug', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocEntryLoaders(repository);

    const slug = '/veniam';
    const entry = await loaders.entry.bySlug.load(slug);

    expect(entry).toBeUndefined();

    expect.assertions(1);
  });

  it('returns a method to load a list of doc entries', async () => {
    const repository = new DocRepository(DOC_FIXTURES_DIR);
    const loaders = initDocEntryLoaders(repository);

    const entries = await loaders.entry.list();

    expect(entries).toStrictEqual([]);

    expect.assertions(1);
  });
});
