import { isAbsolute } from 'path';
import {
  type DirectoryContents,
  readDir,
  type Directory,
} from '@cretadoc/read-dir';
import { isString, type Maybe } from '@cretadoc/utils';
import { MARKDOWN_EXTENSION } from '../utils/constants';
import { ConfigError } from '../utils/errors/exceptions';
import { error } from '../utils/errors/messages';

export type FileSystemRepositoryContext = 'Documentation' | 'Pages';

export class FileSystemRepository {
  #rootDir: string;

  constructor(dir: string, context: FileSystemRepositoryContext) {
    if (!isString(context))
      throw new ConfigError(
        'FileSystem Repository context',
        error.invalid.type('string')
      );

    if (!isString(dir))
      throw new ConfigError(
        `${context} repository`,
        error.invalid.type('string')
      );

    if (!isAbsolute(dir))
      throw new ConfigError(
        `${context} repository`,
        error.invalid.path('absolute')
      );

    this.#rootDir = dir;
  }

  /**
   * Retrieve the filesystem root directory.
   *
   * @returns {string} The root directory path.
   */
  public getRootDir(): string {
    return this.#rootDir;
  }

  /**
   * Retrieve the directory data from a path.
   *
   * @returns {Promise<Directory>} The directory data.
   */
  public async getDirectoryDataFrom(path: string): Promise<Directory> {
    return readDir(path, {
      extensions: [MARKDOWN_EXTENSION],
      includeFileContents: true,
    });
  }

  /**
   * Retrieve the contents of a directory.
   *
   * @returns {Promise<Maybe<DirectoryContents>>} The directory contents.
   */
  public async getContentsOf(path: string): Promise<Maybe<DirectoryContents>> {
    const dir = await this.getDirectoryDataFrom(path);

    return dir.content;
  }
}
