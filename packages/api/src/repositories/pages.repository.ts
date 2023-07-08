import { parse } from 'path';
import type { RegularFile } from '@cretadoc/read-dir';
import { type Maybe, slugify } from '@cretadoc/utils';
import type {
  ListInput,
  Page,
  PageCreate,
  PageDeleteInput,
  PageInput,
  PageUpdate,
} from '../types';
import {
  decodeBase64String,
  generateBase64String,
  getFilenameWithExt,
  parseMarkdown,
} from '../utils/helpers';
import { FileSystemRepository } from './filesystem.repository';

export class PagesRepository extends FileSystemRepository {
  constructor(dir: string) {
    super(dir, 'pages');
  }

  /**
   * Convert a RegularFile object to a Page object.
   *
   * @param {RegularFile} file - A regular file object.
   * @returns {Page} A Page object.
   */
  #convertRegularFileToPage({
    createdAt,
    name,
    path,
    updatedAt,
    contents,
  }: RegularFile): Page {
    const relativePath = this.getRelativePathFrom(path);
    const { content, meta } = parseMarkdown(contents ?? '');

    return {
      contents: content,
      createdAt,
      id: generateBase64String(relativePath),
      meta,
      name,
      path: relativePath,
      slug: `/${slugify(name)}`,
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
   * Find the pages matching the given parameters.
   *
   * @param {ListInput<Page>} params - The parameters.
   * @returns {Promise<Page[]>} The matching pages.
   */
  public async find(params?: ListInput<Page>): Promise<Page[]> {
    const { orderBy, where } = params ?? {};
    const pages = (await this.#getPages()) ?? [];
    const filteredPages = this.filter(pages, where);

    return this.order(filteredPages, orderBy);
  }

  /**
   * Create a new page in pages directory.
   *
   * @param {PageCreate} page - The page to write.
   * @returns {Promise<Maybe<Page>>} The new page.
   */
  public async create({
    contents,
    meta,
    name,
  }: PageCreate): Promise<Maybe<Page>> {
    await this.createMarkdownFile({ contents, meta, name });

    return this.get('name', name);
  }

  /**
   * Update an existing page.
   *
   * @param {PageUpdate} data - The data to update.
   * @returns {Promise<Maybe<Page>>} The updated page.
   */
  public async updatePage({
    contents,
    id,
    meta,
    name,
  }: PageUpdate): Promise<Maybe<Page>> {
    const relativePath = decodeBase64String(id);
    const absolutePath = this.getAbsolutePathFrom(relativePath);
    const newAbsolutePath = await this.update(absolutePath, {
      contents,
      meta,
      name,
    });
    const newPageName = parse(newAbsolutePath).name;

    return this.get('name', newPageName);
  }

  /**
   * Remove a page from the repository.
   *
   * @param {PageDeleteInput['input']} data - The id or path of the name.
   * @returns {Promise<Maybe<Page>>} The deleted page.
   */
  public async remove({
    id,
    name,
  }: PageDeleteInput['input']): Promise<Maybe<Page>> {
    let relativePath: Maybe<string> = undefined;

    if (id) relativePath = decodeBase64String(id);
    else if (name)
      relativePath = this.getRelativePathFrom(getFilenameWithExt(name));

    if (!relativePath) return undefined;

    const pageName = parse(relativePath).name;
    const page = await this.get('name', pageName);

    if (page) await this.del(relativePath);

    return page;
  }
}
