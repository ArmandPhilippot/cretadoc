import { readFile, rename, rm, writeFile } from 'fs/promises';
import { isAbsolute, join, parse } from 'path';
import { type DirectoryContents, readDir } from '@cretadoc/read-dir';
import { type Maybe, isObjKeyExist, isObject } from '@cretadoc/utils';
import type {
  APIDataConfig,
  DocDirectory,
  DocEntry,
  DocEntryKind,
  DocFile,
  Meta,
  NonOptionalKeysOf,
  OrderBy,
  Page,
  ResolveOrderFields,
  ResolveWhereFields,
} from '../types';
import { EXCERPT_SEPARATOR, MARKDOWN_EXTENSION } from '../utils/constants';
import { CretadocAPIError } from '../utils/exceptions';
import {
  byCreatedAtProp,
  byNameProp,
  byPathProp,
  bySlugProp,
  byUpdatedAtProp,
  convertMetaToFrontMatter,
  getDatetimeFormat,
  getFilenameWithExt,
  getRelativePath,
  isDocEntry,
  isMarkdownFile,
  isPathInRoot,
  normalizePath,
  parseMarkdown,
} from '../utils/helpers';

export type FileSystemData = {
  /**
   * The file contents if it is a Markdown file.
   */
  contents?: string;
  /**
   * The file excerpt.
   */
  excerpt?: string;
  /**
   * The file metadata.
   */
  meta?: Meta;
  /**
   * A filename (without extension).
   */
  name: string;
  /**
   * The relative path of directory where the file is located.
   */
  parentPath?: string;
};

/**
 * Check if the given value is a Page.
 *
 * @param {unknown} value - A value to compare.
 * @returns {boolean} True if value is a Page object.
 */
const isPage = (value: unknown): value is Page => {
  if (!value) return false;
  if (!isObject(value)) return false;

  const mandatoryKeys: Array<NonOptionalKeysOf<Page>> = [
    'createdAt',
    'id',
    'name',
    'path',
    'slug',
    'updatedAt',
  ];

  for (const key of mandatoryKeys) if (!isObjKeyExist(value, key)) return false;

  return true;
};

/**
 * Check if the given value is a DocEntry or a Page.
 *
 * @param {unknown} value - A value to compare.
 * @param {Maybe<DocEntryKind>} kind - The entry kind.
 * @returns {boolean} True if value is a DocEntry or a Page object.
 */
const isValidEntry = <
  K extends Maybe<DocEntryKind> = undefined,
  T extends DocEntry | Page = K extends 'directory'
    ? DocDirectory
    : K extends 'file'
    ? DocFile
    : Page
>(
  value: unknown,
  kind: Maybe<DocEntryKind>
): value is T => {
  if (kind) return isDocEntry(value, kind);

  return isDocEntry(value, kind) || isPage(value);
};

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
   * Compare the entry with the given filters.
   *
   * @param {T} entry - The entry to check.
   * @param {I} filters - The filters.
   * @returns {boolean} True if the entry matches the filters.
   */
  #isEntryMatchingFilters<
    T extends DocEntry | Page,
    I extends ResolveWhereFields<T> = ResolveWhereFields<T>,
    K extends Maybe<DocEntryKind> = undefined
  >(entry: T, filters: Partial<I>, kind?: K): boolean {
    const filtersEntries = Object.entries(filters) as Array<
      [
        keyof Omit<
          DocEntry & Page,
          'contents' | 'excerpt' | 'meta' | 'parent' | 'type'
        >,
        Maybe<string>
      ]
    >;

    return filtersEntries.every(([key, value]) => {
      if (value === undefined) return true;

      if (key === 'path' || key === 'slug')
        return (
          isDocEntry(entry, kind) && entry.parent && entry.parent[key] === value
        );

      return entry[key].includes(value);
    });
  }

  /**
   * Filter the entries.
   *
   * @param {T[]} entries - The entries.
   * @param {Maybe<I>} where - The filter parameters.
   * @param {K} [kind] - The entry kind.
   * @returns {T[]} The filtered entries.
   */
  protected filter<
    T extends DocEntry | Page,
    I extends ResolveWhereFields<T> = ResolveWhereFields<T>,
    K extends Maybe<DocEntryKind> = undefined
  >(entries: T[], where: Maybe<I>, kind?: K): T[] {
    if (!where) return entries;

    const filteredEntries: T[] = [];

    JSON.stringify(entries, (_, entry: unknown) => {
      if (
        isValidEntry(entry, kind) &&
        this.#isEntryMatchingFilters(entry, where)
      )
        filteredEntries.push(entry as T);

      return entry;
    });

    return filteredEntries;
  }

  /**
   * Order the given entries.
   *
   * @param {T[]} entries - The entries.
   * @param {Maybe<I>} orderBy - The order by instructions.
   * @returns {T[]} The ordered entries.
   */
  protected order<
    T extends DocEntry | Page,
    I extends OrderBy<ResolveOrderFields<T>> = OrderBy<ResolveOrderFields<T>>
  >(entries: T[], orderBy: Maybe<I>): T[] {
    if (!orderBy) return entries;

    const { direction, field } = orderBy;
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
    meta,
    name,
    contents = '',
    excerpt,
    parentPath = '',
  }: FileSystemData): Promise<string> {
    const filename = getFilenameWithExt(name);
    const relativePath = this.getRelativePathFrom(join(parentPath, filename));
    const absolutePath = this.getAbsolutePathFrom(relativePath);
    const creationDate = getDatetimeFormat(new Date());
    const allMeta: Meta = {
      ...meta,
      createdAt: meta?.createdAt ?? creationDate,
      updatedAt: meta?.updatedAt ?? creationDate,
    };
    const frontMatter = convertMetaToFrontMatter(allMeta);
    const excerptWithSep = excerpt ? `${excerpt}${EXCERPT_SEPARATOR}` : '';
    const mdContents = `${frontMatter}${excerptWithSep}${contents}`;

    await writeFile(absolutePath, mdContents, { encoding: 'utf8' });

    return absolutePath;
  }

  async #getCurrentFileContents(path: string) {
    const currentContents = await readFile(path, { encoding: 'utf8' });
    const markdownContents = parseMarkdown(currentContents);

    return markdownContents;
  }

  /**
   * Merge the received meta with the current ones.
   *
   * @param {Meta} current - The current meta.
   * @param {Meta} newMeta - The received meta.
   * @returns {Meta} The merged meta.
   */
  #mergeMeta(current: Meta, newMeta: Meta): Meta {
    const keys = Object.keys({ ...current, ...newMeta }) as Array<keyof Meta>;
    const mergedEntries: Array<[keyof Meta, Required<Meta[keyof Meta]>]> = [];

    for (const key of keys) {
      // An empty string should mean erase the current value.
      if (current[key] && newMeta[key] === '') continue;

      if (!newMeta[key] && current[key])
        if (key === 'updatedAt')
          mergedEntries.push([key, getDatetimeFormat(new Date())]);
        else mergedEntries.push([key, current[key]]);
      else mergedEntries.push([key, newMeta[key]]);
    }

    return Object.fromEntries(mergedEntries) as Meta;
  }

  /**
   * Update the frontmatter using current and new meta.
   *
   * @param {Maybe<Meta>} current - The current meta.
   * @param {Maybe<Meta>} newMeta - The received meta.
   * @returns {string} The updated frontmatter
   */
  #getUpdatedFrontMatter(current: Maybe<Meta>, newMeta: Maybe<Meta>): string {
    if (current && !newMeta) return convertMetaToFrontMatter(current);

    if (!current && newMeta) return convertMetaToFrontMatter(newMeta);

    if (current && newMeta) {
      const mergedMeta = this.#mergeMeta(current, newMeta);

      return convertMetaToFrontMatter(mergedMeta);
    }

    return '';
  }

  /**
   * Update the file contents.
   *
   * @param {string} path - The file path.
   * @param {string} contents - The new file contents.
   */
  async #updateFileContents(
    path: string,
    {
      contents,
      excerpt,
      meta,
    }: Pick<FileSystemData, 'contents' | 'excerpt' | 'meta'>
  ) {
    if (!isMarkdownFile(path))
      throw new CretadocAPIError('Cannot update contents', {
        errorKind: 'syntax',
        reason: 'Only markdown file can be updated',
        received: path,
      });

    const {
      contents: currentContent,
      excerpt: currentExcerpt,
      meta: currentMeta,
    } = await this.#getCurrentFileContents(path);
    const frontMatter = this.#getUpdatedFrontMatter(currentMeta, meta);
    const regularContents = contents ?? currentContent;
    const fileExcerpt = excerpt ?? currentExcerpt;
    const excerptWithSep = fileExcerpt
      ? `${fileExcerpt}${EXCERPT_SEPARATOR}`
      : '';
    const mdContents = `${frontMatter}${excerptWithSep}${regularContents}`;

    await writeFile(path, mdContents, { encoding: 'utf8' });
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
    { contents, excerpt, meta, name, parentPath }: Partial<FileSystemData>
  ): Promise<string> {
    const currentPath = parse(path);
    const newName =
      isMarkdownFile(path) && name
        ? getFilenameWithExt(name)
        : name ?? currentPath.base;
    const basePath = parentPath ?? this.getRelativePathFrom(currentPath.dir);
    const newPath = this.getAbsolutePathFrom(join(basePath, newName));

    if (!!contents || !!excerpt || !!meta)
      await this.#updateFileContents(path, { contents, excerpt, meta });

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
