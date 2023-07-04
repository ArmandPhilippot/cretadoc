import { describe, expect, it } from 'vitest';
import { PAGES_FIXTURES_DIR } from '../../../tests/utils/constants';
import { PagesRepository } from '../../repositories';
import { generateBase64String } from '../../utils/helpers';
import { initPageLoaders } from './pages.loaders';

describe('init-page-loaders', () => {
  it('returns the page loaders', () => {
    const repository = new PagesRepository(PAGES_FIXTURES_DIR);
    const loaders = initPageLoaders(repository);

    expect(loaders.page).not.toBeUndefined();
    expect(loaders.page?.byId).not.toBeUndefined();
    expect(loaders.page?.byName).not.toBeUndefined();
    expect(loaders.page?.bySlug).not.toBeUndefined();
    expect(loaders.page?.list).not.toBeUndefined();
  });

  it('returns a method to load page by id', async () => {
    const repository = new PagesRepository(PAGES_FIXTURES_DIR);
    const loaders = initPageLoaders(repository);

    if (loaders.page) {
      const id = generateBase64String('./eum');
      const page = await loaders.page.byId.load(id);

      expect(page).toBeUndefined();
    }

    expect.assertions(1);
  });

  it('returns a method to load page by name', async () => {
    const repository = new PagesRepository(PAGES_FIXTURES_DIR);
    const loaders = initPageLoaders(repository);

    if (loaders.page) {
      const name = 'unde';
      const page = await loaders.page.byName.load(name);

      expect(page).toBeUndefined();
    }

    expect.assertions(1);
  });

  it('returns a method to load page by slug', async () => {
    const repository = new PagesRepository(PAGES_FIXTURES_DIR);
    const loaders = initPageLoaders(repository);

    if (loaders.page) {
      const slug = '/veniam';
      const page = await loaders.page.bySlug.load(slug);

      expect(page).toBeUndefined();
    }

    expect.assertions(1);
  });

  it('returns a method to load a list of pages', async () => {
    const repository = new PagesRepository(PAGES_FIXTURES_DIR);
    const loaders = initPageLoaders(repository);

    if (loaders.page) {
      const pages = await loaders.page.list({ first: 10 });

      expect(pages.data).toStrictEqual([]);
      expect(pages.total).toBe(0);
    }

    expect.assertions(2);
  });
});
