import { stat } from 'node:fs/promises';
import { join, parse, sep } from 'node:path';
import { slugify } from '@cretadoc/utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pages, pagesFixtures } from '../../tests/fixtures/pages';
import { PAGES_FIXTURES_DIR } from '../../tests/utils/constants';
import { createFixtures, deleteFixturesIn } from '../../tests/utils/helpers';
import { MARKDOWN_EXTENSION } from '../utils/constants';
import { byNameProp, generateBase64String } from '../utils/helpers';
import { PagesRepository } from './pages.repository';

const rootPages = [...pages]
  .sort(byNameProp)
  .filter((page) => page.path.replace('./', '').split(sep).length === 1)
  .filter((page) => page.path.endsWith(MARKDOWN_EXTENSION));

/* eslint-disable max-statements */
describe('PagesRepository', () => {
  beforeAll(async () => {
    await createFixtures(pagesFixtures);
  });

  afterAll(async () => {
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  });

  it('can get a page by name', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pagePath = pagesFixtures[0]?.path ?? '';
    const pageName = parse(pagePath).name;
    const page = await repo.get('name', pageName);

    expect(page?.name).toBe(pageName);
    expect(page?.path).toBe(pagePath.replace(PAGES_FIXTURES_DIR, './'));
    expect.assertions(2);
  });

  it('can get a page by id', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pagePath = pagesFixtures[0]?.path ?? '';
    const relativePath = pagePath.replace(PAGES_FIXTURES_DIR, './');
    const pageId = generateBase64String(relativePath);
    const page = await repo.get('id', pageId);

    expect(page?.path).toBe(relativePath);
    expect(page?.id).toBe(pageId);
    expect.assertions(2);
  });

  it('can get a page by slug', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pagePath = pagesFixtures[0]?.path ?? '';
    const pageName = parse(pagePath).name;
    const slug = `/${slugify(pageName)}` as const;
    const page = await repo.get('slug', slug);

    expect(page?.path).toBe(pagePath.replace(PAGES_FIXTURES_DIR, './'));
    expect(page?.name).toBe(pageName);
    expect(page?.slug).toBe(slug);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can get many pages by name', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pagePath = pagesFixtures[0]?.path ?? '';
    const pageName = parse(pagePath).name;
    const requestedPages = await repo.getMany('name', [pageName]);

    expect(requestedPages?.length).toBe(1);
    expect(requestedPages?.every((page) => page.name === pageName)).toBe(true);
    expect.assertions(2);
  });

  it('can find a list of pages', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find();

    expect(edges.length).toBe(rootPages.length);

    expect.assertions(1);
  });

  it('can find a list of pages ordered by creation date', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      orderBy: { direction: 'ASC', field: 'createdAt' },
    });

    expect(edges.length).toBe(rootPages.length);

    expect.assertions(1);
  });

  it('can find a list of pages ordered by name', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      orderBy: { direction: 'ASC', field: 'name' },
    });

    expect(edges.length).toBe(rootPages.length);

    expect.assertions(1);
  });

  it('can find a list of pages ordered by slug', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      orderBy: { direction: 'ASC', field: 'slug' },
    });

    expect(edges.length).toBe(rootPages.length);

    expect.assertions(1);
  });

  it('can find a list of pages ordered by update', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      orderBy: { direction: 'ASC', field: 'updatedAt' },
    });

    expect(edges.length).toBe(rootPages.length);

    expect.assertions(1);
  });

  it('can find a list of pages filtered by name', async () => {
    const wantedFilename = 'na';
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      where: { name: wantedFilename },
    });

    expect(edges.length).toBeTruthy();
    expect(edges.every((page) => page.name.includes(wantedFilename)));
    expect.assertions(2);
  });

  it('can find a list of pages filtered by creation date', async () => {
    const stats = await stat(join(PAGES_FIXTURES_DIR, pages[0]?.path ?? ''));
    const wantedDate = stats.birthtime.toISOString();
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      where: { createdAt: wantedDate },
    });

    expect(edges.length).toBeTruthy();
    expect(edges.every((page) => page.createdAt.includes(wantedDate)));
    expect.assertions(2);
  });

  it('can find a list of pages filtered by update date', async () => {
    const stats = await stat(join(PAGES_FIXTURES_DIR, pages[0]?.path ?? ''));
    const wantedDate = stats.mtime.toISOString();
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const edges = await repo.find({
      where: { updatedAt: wantedDate },
    });

    expect(edges.length).toBeTruthy();
    expect(edges.every((page) => page.updatedAt.includes(wantedDate)));
    expect.assertions(2);
  });

  it('can create a new page', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pageName = 'numquam';
    const pageContents = 'a aliquid omnis';
    const page = await repo.create({ name: pageName, contents: pageContents });

    expect(page).not.toBeUndefined();
    expect(page?.contents).toBe(pageContents);
    expect(page?.name).toBe(pageName);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can update a page', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pageName = 'nemo';
    const pageContents = 'a aliquid omnis';
    const createdPage = await repo.create({
      name: pageName,
      contents: pageContents,
    });
    const newPageName = 'dolore';
    const page = await repo.updatePage({
      id: createdPage?.id ?? '',
      name: newPageName,
    });

    expect(page).not.toBeUndefined();
    expect(page?.contents).toBe(pageContents);
    expect(page?.name).toBe(newPageName);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it('can remove a page by name', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pageName = 'incidunt';
    const pageContents = 'a aliquid omnis';
    const page = await repo.create({
      name: pageName,
      contents: pageContents,
    });
    const deletedPage = await repo.remove({ name: page?.name });

    expect(deletedPage).toStrictEqual(page);
    expect.assertions(1);
  });

  it('can remove a page by id', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const pageName = 'commodi';
    const pageContents = 'cum eius enim';
    const page = await repo.create({
      name: pageName,
      contents: pageContents,
    });
    const deletedPage = await repo.remove({ id: page?.id });

    expect(deletedPage).toStrictEqual(page);
    expect.assertions(1);
  });

  it('returns undefined if the page does not exist', async () => {
    const repo = new PagesRepository(PAGES_FIXTURES_DIR, '/page');
    const deletedPage = await repo.remove({ name: undefined });

    expect(deletedPage).toBeUndefined();
  });
});
/* eslint-enable max-statements */
