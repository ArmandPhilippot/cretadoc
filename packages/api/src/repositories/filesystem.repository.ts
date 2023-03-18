import { rename, rm, writeFile } from 'fs/promises';
import { isAbsolute, join } from 'path';
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

  /**
   * Transform an absolute path to a relative path.
   *
   * @param {string} absolutePath - An absolute path.
   * @returns {string} A relative path.
   */
  public getRelativePathFrom(absolutePath: string): string {
    if (!isAbsolute(absolutePath))
      throw new Error(error.invalid.path('absolute'));

    return absolutePath.replace(this.#rootDir, './');
  }

  /**
   * Retrieve the absolute path of a markdown file.
   *
   * @param {string} name - The filename without extension.
   * @returns {string} The absolute path.
   */
  #getMarkdownFileAbsolutePath(relativePath: string, name: string): string {
    const basePath = join(this.getRootDir(), relativePath);

    return join(basePath, `./${name}${MARKDOWN_EXTENSION}`);
  }

  /**
   * Create a new markdown file in the given directory.
   *
   * @param {string} path - A relative path where to create the new file.
   * @param {string} name - The filename to create.
   * @param {string} [content] - The file contents to write.
   * @returns {Promise<string>} The absolute file path.
   */
  public async createMarkdownFile(
    path: string,
    name: string,
    content?: string
  ): Promise<string> {
    const filePath = this.#getMarkdownFileAbsolutePath(path, name);
    await writeFile(filePath, content ?? '', { encoding: 'utf8' });

    return filePath;
  }

  /**
   * Retrieve an absolute file path from its name.
   *
   * @param {string} name - The filename without extension.
   * @param {string} [parentPath] - The relative parent path.
   * @returns {string} The absolute path.
   */
  #getAbsolutePathFrom(name: string, parentPath?: string): string {
    const filename = `./${name}${MARKDOWN_EXTENSION}`;
    const fileWithParentPath = parentPath
      ? join(parentPath, filename)
      : filename;

    return join(this.getRootDir(), fileWithParentPath);
  }

  /**
   * Rename a file.
   *
   * @param {string} newName - The new file name.
   * @param {string} oldPath - The old absolute path.
   * @param {string} [newParentPath] - The new relative parent path.
   * @returns {Promise<string>} The new absolute path.
   */
  public async renameFile(
    newName: string,
    oldPath: string,
    newParentPath?: string
  ): Promise<string> {
    const newPath = this.#getAbsolutePathFrom(newName, newParentPath);
    await rename(oldPath, newPath);

    return newPath;
  }

  /**
   * Delete an existing file.
   *
   * @param {PageDelete} relativePath - The relative path of the file.
   * @returns {Promise<void>}
   */
  public async del(relativePath: string): Promise<void> {
    const absolutePath = join(this.getRootDir(), relativePath);
    await rm(absolutePath);
  }
}
