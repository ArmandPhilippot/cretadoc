import { isAbsolute } from 'path';
import { readDir, type RegularFile } from '@cretadoc/read-dir';
import { isString, type Maybe } from '@cretadoc/utils';
import type { Page, PageInput } from '../../types';
import { MARKDOWN_EXTENSION } from '../../utils/constants';
import { ConfigError } from '../../utils/errors/exceptions';
import { error } from '../../utils/errors/messages';

export class PagesRepository {
  #rootDir: string;

  constructor(dir: string) {
    if (!isString(dir))
      throw new ConfigError('Pages directory', error.invalid.type('string'));

    if (!isAbsolute(dir))
      throw new ConfigError('Pages directory', error.invalid.path('absolute'));

    this.#rootDir = dir;
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
    content,
  }: RegularFile): Page {
    const relativePath = path.replace(this.#rootDir, './');

    return {
      content,
      createdAt,
      id: Buffer.from(relativePath).toString('base64'),
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
    const dir = await readDir(this.#rootDir, {
      extensions: [MARKDOWN_EXTENSION],
      includeFileContents: true,
    });

    return dir.content?.files.map((file) =>
      this.#convertRegularFileToPage(file)
    );
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
}
