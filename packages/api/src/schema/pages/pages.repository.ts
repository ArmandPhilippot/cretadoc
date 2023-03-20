import { writeFile } from 'fs/promises';
import { join, parse } from 'path';
import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe } from '@cretadoc/utils';
import { FileSystemRepository } from '../../repositories/filesystem.repository';
import type {
  ListInput,
  ListReturn,
  OrderBy,
  Page,
  PageCreate,
  PageInput,
  PageOrderFields,
  PageUpdate,
  PageWhereFields,
} from '../../types';
import {
  byCreatedAtProp,
  byNameProp,
  byUpdatedAtProp,
  decodeBase64String,
  generateBase64String,
} from '../../utils/helpers';

export class PagesRepository extends FileSystemRepository {
  constructor(dir: string) {
    super(dir, 'Pages');
  }

  /**
   * Convert a RegularFile object to a Page object.
   *
   * @param {RegularFile} file - An object.
   * @returns {Page} A Page object.
   */
  #convertRegularFileToPage({
    createdAt,
    name,
    path,
    updatedAt,
    contents,
  }: RegularFile): Page {
    const relativePath = path.replace(this.getRootDir(), './');

    return {
      contents,
      createdAt,
      id: generateBase64String(relativePath),
      name,
      path: relativePath,
      updatedAt,
    };
  }

  /**
   * Retrieve all the pages.
   *
   * @returns {Promise<Maybe<Page[]>>} The pages.
   */
  async #getPages(): Promise<Maybe<Page[]>> {
    const dirContents = await this.getContentsOf(this.getRootDir());

    return dirContents?.files.map((file) =>
      this.#convertRegularFileToPage(file)
    );
  }

  /**
   * Retrieve a page by looking for a value in a prop.
   *
   * @param prop - The prop name.
   * @param value - The value to looking for.
   * @returns {Promise<Maybe<Page>>} The matching page.
   */
  public async get<P extends keyof PageInput>(
    prop: P,
    value: PageInput[P]
  ): Promise<Maybe<Page>> {
    const pages = await this.#getPages();

    return pages?.find((page) => page[prop] === value);
  }

  /**
   * Retrieve many pages by looking for values in a prop.
   *
   * @param prop - The prop name.
   * @param values - The values to looking for.
   * @returns {Promise<Maybe<Page[]>>} The matching pages.
   */
  public async getMany<P extends keyof PageInput>(
    prop: P,
    values: ReadonlyArray<PageInput[P]>
  ): Promise<Maybe<Page[]>> {
    const pages = await this.#getPages();

    return pages?.filter((page) => values.includes(page[prop]));
  }

  /**
   * Filter the pages.
   *
   * @param {Page[]} pages - The pages.
   * @param {PageWhereFields} where - The filter parameters.
   * @returns {Page[]} The filtered pages.
   */
  #filter(
    pages: Page[],
    { createdAt, name, updatedAt }: PageWhereFields
  ): Page[] {
    let filteredPages = pages;

    if (createdAt)
      filteredPages = filteredPages.filter(
        (page) => page.createdAt === createdAt
      );

    if (name)
      filteredPages = filteredPages.filter((page) => page.name.includes(name));

    if (updatedAt)
      filteredPages = filteredPages.filter(
        (page) => page.updatedAt === updatedAt
      );

    return filteredPages;
  }

  /**
   * Order the given pages.
   *
   * @param {Page[]} pages - The pages.
   * @param {OrderBy<PageOrderFields>} orderBy - The order by instructions.
   * @returns {Page[]} The ordered pages.
   */
  #order(
    pages: Page[],
    { direction, field }: OrderBy<PageOrderFields>
  ): Page[] {
    let orderedPages = pages;

    switch (field) {
      case 'createdAt':
        orderedPages = orderedPages.sort(byCreatedAtProp);
        break;
      case 'name':
        orderedPages = orderedPages.sort(byNameProp);
        break;
      case 'updatedAt':
        orderedPages = orderedPages.sort(byUpdatedAtProp);
        break;
      default:
        break;
    }

    return direction === 'ASC' ? orderedPages : orderedPages.reverse();
  }

  /**
   * Find the pages matching the given parameters.
   *
   * @param {ListInput<Page>} params - The list parameters.
   * @returns {Promise<ListReturn<Page[]>>} The matching pages.
   */
  public async find({
    first,
    after,
    orderBy,
    where,
  }: ListInput<Page>): Promise<ListReturn<Page[]>> {
    const pages = await this.#getPages();

    if (!pages)
      return {
        data: undefined,
        total: 0,
      };

    const filteredPages = where ? this.#filter(pages, where) : pages;
    const orderedPages = orderBy
      ? this.#order(filteredPages, orderBy)
      : filteredPages;

    return {
      data: orderedPages.slice(after, (after ?? 0) + first),
      total: orderedPages.length,
    };
  }

  /**
   * Create a new page in pages directory.
   *
   * @param {PageCreate} page - The page to write.
   * @returns {Promise<Maybe<Page>>} The new page.
   */
  public async create({ name, contents }: PageCreate): Promise<Maybe<Page>> {
    await this.createMarkdownFile('./', name, contents);

    return this.get('name', name);
  }

  /**
   * Update an existing page.
   *
   * @param {PageUpdate} data - The data to update.
   * @returns {Promise<Maybe<Page>>} The updated page.
   */
  public async update({
    contents,
    id,
    name,
  }: PageUpdate): Promise<Maybe<Page>> {
    const relativePath = decodeBase64String(id);
    const oldName = parse(relativePath).name;
    const newName = name ?? oldName;
    const absolutePath = join(this.getRootDir(), relativePath);
    const newAbsolutePath =
      name && oldName !== name
        ? await this.renameFile(name, absolutePath)
        : absolutePath;

    if (contents)
      await writeFile(newAbsolutePath, contents, {
        encoding: 'utf8',
      });

    return this.get('name', newName);
  }
}
