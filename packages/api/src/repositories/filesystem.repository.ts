import { rename, rm, writeFile } from 'fs/promises';
import { isAbsolute, join } from 'path';
import {
  type DirectoryContents,
  readDir,
  type Directory,
} from '@cretadoc/read-dir';
import { isString, type Maybe } from '@cretadoc/utils';
import type { ErrorDetails } from '../types';
import { MARKDOWN_EXTENSION } from '../utils/constants';
import { CretadocAPIError } from '../utils/exceptions';

export type FileSystemRepositoryContext = 'Documentation' | 'Pages';

export class FileSystemRepository {
  #rootDir: string;

  constructor(dir: string, context: FileSystemRepositoryContext) {
    const errors: ErrorDetails[] = [];

    if (!isString(context))
      errors.push({
        errorKind: 'type',
        reason: `Repository context must be a string`,
        received: typeof context,
      });

    if (!isString(dir))
      errors.push({
        errorKind: 'type',
        reason: `Repository directory must be a string`,
        received: typeof dir,
      });

    if (!isAbsolute(dir))
      errors.push({
        errorKind: 'syntax',
        reason: `Repository directory must be an absolute path`,
        received: dir,
      });

    if (errors.length)
      throw new CretadocAPIError(
        'Cannot initialize FileSystemRepository',
        errors
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
   * @param {string} dir - The absolute path of a directory.
   * @returns {Promise<Maybe<DirectoryContents>>} The directory contents.
   */
  public async getContentsOf(dir: string): Promise<Maybe<DirectoryContents>> {
    const requestedDir = await this.getDirectoryDataFrom(dir);

    return requestedDir.contents;
  }

  /**
   * Transform an absolute path to a relative path.
   *
   * @param {string} absolutePath - An absolute path.
   * @returns {string} A relative path.
   */
  public getRelativePathFrom(absolutePath: string): string {
    if (!isAbsolute(absolutePath))
      throw new CretadocAPIError('Cannot get relative path', {
        errorKind: 'syntax',
        reason: 'Must be an absolute path',
        received: absolutePath,
      });

    return absolutePath.replace(this.#rootDir, './');
  }

  /**
   * Retrieve an absolute file path from its name.
   *
   * @param {string} name - The filename without extension.
   * @param {string} [parentPath] - The relative parent path.
   * @returns {string} The absolute path.
   */
  #getAbsolutePathFrom(name: string, parentPath?: string): string {
    const fileWithParentPath = parentPath ? join(parentPath, name) : name;

    return join(this.getRootDir(), fileWithParentPath);
  }

  /**
   * Retrieve the filename with markdown extension.
   *
   * @param {string} name - The filename without extension.
   * @returns {string} The filename with extension.
   */
  public getMDFilenameFrom(name: string): string {
    return `${name}${MARKDOWN_EXTENSION}`;
  }

  /**
   * Retrieve the absolute path of a markdown file.
   *
   * @param {string} name - The filename without extension.
   * @param {string} [parentPath] - The relative path of its parent.
   * @returns {string} The absolute path.
   */
  #getMarkdownFileAbsolutePath(name: string, parentPath?: string): string {
    return this.#getAbsolutePathFrom(this.getMDFilenameFrom(name), parentPath);
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
    const filePath = this.#getMarkdownFileAbsolutePath(name, path);
    await writeFile(filePath, content ?? '', { encoding: 'utf8' });

    return filePath;
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
    const isMarkdownFile = oldPath.endsWith(MARKDOWN_EXTENSION);
    const newPath = isMarkdownFile
      ? this.#getMarkdownFileAbsolutePath(newName, newParentPath)
      : this.#getAbsolutePathFrom(newName, newParentPath);
    await rename(oldPath, newPath);

    return newPath;
  }

  /**
   * Delete an existing file.
   *
   * @param {string} relativePath - The relative path of the file.
   * @param {boolean} [isRecursive] - Should the removal be recursive?
   * @returns {Promise<void>}
   */
  public async del(relativePath: string, isRecursive?: boolean): Promise<void> {
    const absolutePath = join(this.getRootDir(), relativePath);
    await rm(absolutePath, { recursive: !!isRecursive });
  }
}
