import { rename, rm, writeFile } from 'fs/promises';
import { isAbsolute, join, parse } from 'path';
import { type DirectoryContents, readDir } from '@cretadoc/read-dir';
import { type Maybe, isObjKeyExist, isString } from '@cretadoc/utils';
import type {
  APIDataConfig,
  DocEntry,
  OrderBy,
  Page,
  ResolveOrderFields,
  ResolveWhereFields,
} from '../types';
import { MARKDOWN_EXTENSION } from '../utils/constants';
import { CretadocAPIError } from '../utils/exceptions';
import {
  byCreatedAtProp,
  byNameProp,
  byPathProp,
  bySlugProp,
  byUpdatedAtProp,
  getFilenameWithExt,
  getRelativePath,
  isMarkdownFile,
  isPathInRoot,
  normalizePath,
} from '../utils/helpers';

type FileSystemData = {
  /**
   * The file contents if it is a Markdown file.
   */
  contents?: string;
  /**
   * A filename (without extension).
   */
  name: string;
  /**
   * The relative path of directory where the file is located.
   */
  parentPath?: string;
};

const isDocEntry = (entry: DocEntry | Page): entry is DocEntry =>
  isObjKeyExist(entry, 'parent');

export class FileSystemRepository {
  #context: string;
  #rootDir: string;

  constructor(dir: string, context: keyof APIDataConfig) {
    if (!isAbsolute(dir))
      throw new CretadocAPIError('Cannot initialize FileSystemRepository', {
        errorKind: 'syntax',
        reason: `${context} directory must be an absolute path`,
        received: dir,
      });

    this.#context = context;
    this.#rootDir = normalizePath(dir);
  }

  /**
   * Retrieve the filesystem root directory.
   *
   * @returns {string} The root directory path.
   */
  protected getRootDir(): string {
    return this.#rootDir;
  }

  /**
   * Transform a relative path to an absolute path.
   *
   * @param {string} relativePath - A relative path.
   * @returns {string} The absolute path.
   */
  protected getAbsolutePathFrom(relativePath: string): string {
    if (isAbsolute(relativePath))
      throw new CretadocAPIError('Cannot get absolute path', {
        errorKind: 'syntax',
        reason: 'Must be a relative path',
        received: relativePath,
      });

    return normalizePath(join(this.getRootDir(), relativePath));
  }

  /**
   * Transform the given path to a relative path.
   *
   * @param {string} path - A path.
   * @returns {string} The relative path compared to root directory.
   */
  protected getRelativePathFrom(path: string): string {
    const absolutePath = isAbsolute(path)
      ? path
      : this.getAbsolutePathFrom(path);

    return getRelativePath(this.getRootDir(), absolutePath);
  }

  /**
   * Check if the given path starts with the repository's root directory.
   *
   * @param {string} path - A path
   * @returns {boolean} True if the path is in root directory.
   */
  #isInRootDir(path: string): boolean {
    return isPathInRoot(this.getRootDir(), path);
  }

  /**
   * Retrieve the contents of a directory.
   *
   * @param {string} dir - The absolute path of a directory.
   * @returns {Promise<Maybe<DirectoryContents>>} The directory contents.
   */
  protected async getContentsOf(
    dir: string
  ): Promise<Maybe<DirectoryContents>> {
    if (!this.#isInRootDir(dir))
      throw new CretadocAPIError('Cannot get the directory contents', {
        errorKind: 'syntax',
        reason: `The given dir must be inside the ${this.#context} directory`,
        received: dir,
      });

    const requestedDir = await readDir(dir, {
      extensions: [MARKDOWN_EXTENSION],
      includeFileContents: true,
    });

    return requestedDir.contents;
  }

  /**
   * Filter the entries.
   *
   * @param {Page[]} entries - The entries.
   * @param {PageWhereFields} where - The filter parameters.
   * @returns {Page[]} The filtered entries.
   */
  protected filter<
    T extends DocEntry | Page,
    I extends ResolveWhereFields<T> = ResolveWhereFields<T>
  >(entries: T[], { createdAt, name, updatedAt, ...input }: I): T[] {
    const path = 'path' in input ? input.path : undefined;
    let filteredEntries = [...entries];

    if (createdAt)
      filteredEntries = filteredEntries.filter(
        (entry) => entry.createdAt === createdAt
      );

    if (name)
      filteredEntries = filteredEntries.filter((entry) =>
        entry.name.includes(name)
      );

    if (entries.every(isDocEntry) && isString(path))
      filteredEntries = filteredEntries.filter((entry) =>
        entry.path.includes(path)
      );

    if (updatedAt)
      filteredEntries = filteredEntries.filter(
        (entry) => entry.updatedAt === updatedAt
      );

    return filteredEntries;
  }

  /**
   * Order the given pages.
   *
   * @param {Page[]} entries - The entries.
   * @param {OrderBy<PageOrderFields>} orderBy - The order by instructions.
   * @returns {Page[]} The ordered entries.
   */
  protected order<
    T extends DocEntry | Page,
    I extends OrderBy<ResolveOrderFields<T>> = OrderBy<ResolveOrderFields<T>>
  >(entries: T[], { direction, field }: I): T[] {
    let orderedEntries = [...entries];

    switch (field) {
      case 'createdAt':
        orderedEntries = orderedEntries.sort(byCreatedAtProp);
        break;
      case 'path':
        orderedEntries = orderedEntries.sort(byPathProp);
        break;
      case 'slug':
        orderedEntries = orderedEntries.sort(bySlugProp);
        break;
      case 'updatedAt':
        orderedEntries = orderedEntries.sort(byUpdatedAtProp);
        break;
      case 'name':
      default:
        orderedEntries = orderedEntries.sort(byNameProp);
        break;
    }

    return direction === 'ASC' ? orderedEntries : orderedEntries.reverse();
  }

  /**
   * Create a new markdown file.
   *
   * @param {FileSystemData} data - The data to create a markdown file.
   * @returns {Promise<string>} The absolute file path.
   */
  protected async createMarkdownFile({
    name,
    contents = '',
    parentPath = '',
  }: FileSystemData): Promise<string> {
    const filename = getFilenameWithExt(name);
    const relativePath = this.getRelativePathFrom(join(parentPath, filename));
    const absolutePath = this.getAbsolutePathFrom(relativePath);

    await writeFile(absolutePath, contents, { encoding: 'utf8' });

    return absolutePath;
  }

  /**
   * Update the file contents.
   *
   * @param {string} path - The file path.
   * @param {string} contents - The new file contents.
   */
  async #updateFileContents(path: string, contents: string) {
    if (isMarkdownFile(path))
      await writeFile(path, contents, { encoding: 'utf8' });
    else
      throw new CretadocAPIError('Cannot update contents', {
        errorKind: 'syntax',
        reason: 'Only markdown file can be updated',
        received: path,
      });
  }

  /**
   * Update the entry at the given path with the given data.
   *
   * @param {string} path - The entry path to update.
   * @param {Partial<FileSystemData>} data - The data to update.
   * @returns {Promise<string>} The new path.
   */
  protected async update(
    path: string,
    { contents, name, parentPath }: Partial<FileSystemData>
  ): Promise<string> {
    const currentPath = parse(path);
    const hasNewContent = !!contents;
    const newName =
      isMarkdownFile(path) && name
        ? getFilenameWithExt(name)
        : name ?? currentPath.base;
    const basePath = parentPath ?? this.getRelativePathFrom(currentPath.dir);
    const newPath = this.getAbsolutePathFrom(join(basePath, newName));

    if (hasNewContent) await this.#updateFileContents(path, contents);
    if (newPath !== path) await rename(path, newPath);

    return newPath;
  }

  /**
   * Delete an existing file.
   *
   * @param {string} relativePath - The relative path of the file.
   * @param {boolean} [isRecursive] - Should the removal be recursive?
   * @returns {Promise<void>}
   */
  protected async del(
    relativePath: string,
    isRecursive?: boolean
  ): Promise<void> {
    const absolutePath = join(this.getRootDir(), relativePath);

    await rm(absolutePath, { recursive: !!isRecursive });
  }
}
