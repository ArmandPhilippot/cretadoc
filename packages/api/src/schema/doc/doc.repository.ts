import { writeFile } from 'fs/promises';
import { basename, join, parse } from 'path';
import type {
  Directory,
  DirectoryContents,
  RegularFile,
} from '@cretadoc/read-dir';
import type { Maybe, Nullable } from '@cretadoc/utils';
import { FileSystemRepository } from '../../repositories/filesystem.repository';
import type {
  DocDirectory,
  DocDirectoryInput,
  DocDirectoryOrderFields,
  DocDirectoryWhereFields,
  DocEntryKind,
  DocEntryParent,
  DocFile,
  DocFileCreate,
  DocFileInput,
  DocFileOrderFields,
  DocFileUpdate,
  DocFileWhereFields,
  ListInput,
  ListReturn,
  OrderBy,
} from '../../types';
import {
  byCreatedAtProp,
  byNameProp,
  byPathProp,
  byUpdatedAtProp,
  decodeBase64String,
  generateBase64String,
} from '../../utils/helpers';

export class DocRepository extends FileSystemRepository {
  constructor(dir: string) {
    super(dir, 'Documentation');
  }

  /**
   * Retrieve the parent directory of path.
   *
   * @param {string} path - A relative path.
   * @returns {Nullable<DocEntryParent>} The parent if it is not root directory.
   */
  #getParentOf(path: string): Nullable<DocEntryParent> {
    const parentPath = parse(path).dir;

    if (parentPath === '.') return null;

    return {
      id: generateBase64String(parentPath),
      name: basename(parentPath),
      path: parentPath,
    };
  }

  /**
   * Convert the DirectoryContents.
   *
   * @param {Maybe<DirectoryContents>} content - An object.
   * @returns {Maybe<DirectoryContents>} The converted object.
   */
  #convertDirectoryContents(
    content: Maybe<DirectoryContents>
  ): Maybe<DirectoryContents> {
    if (!content) return undefined;

    return {
      directories: content.directories.map((dir) => this.#convert(dir)),
      files: content.files.map((file) => this.#convert(file)),
    };
  }

  /**
   * Convert a Directory to a DocDirectory or a RegularFile to a DocFile.
   *
   * @param {Directory | RegularFile} fileOrDir - An object.
   * @returns {DocDirectory | DocFile} The converted object.
   */
  #convert<
    T extends Directory | RegularFile,
    R = T extends Directory ? DocDirectory : DocFile
  >({ createdAt, name, path, type, updatedAt, content }: T): R {
    const relativePath = path.replace(this.getRootDir(), './');

    return {
      content:
        type === 'directory'
          ? this.#convertDirectoryContents(content)
          : content,
      createdAt,
      id: generateBase64String(relativePath),
      name,
      parent: this.#getParentOf(relativePath),
      path: relativePath,
      type,
      updatedAt,
    } as R;
  }

  /**
   * Retrieve the documentation directories in a directory.
   *
   * @returns {Promise<Maybe<DirectoryContents>>} The documentation directories.
   */
  async #getDirectoriesIn(path: string): Promise<Maybe<DocDirectory[]>> {
    const dirContents = await this.getContentsOf(path);

    return dirContents?.directories.map((dir) => this.#convert(dir));
  }

  /**
   * Retrieve a documentation directory by looking for a value in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {DocDirectoryInput[P]} value - The value to looking for.
   * @param {string} [parentPath] - The parent relative path.
   * @returns {Promise<Maybe<DocDirectory>>} The matching documentation directory.
   */
  public async getDirectory<P extends keyof DocDirectoryInput>(
    prop: P,
    value: DocDirectoryInput[P],
    parentPath?: string
  ): Promise<Maybe<DocDirectory>> {
    const path = parentPath
      ? join(this.getRootDir(), parentPath)
      : this.getRootDir();
    const directories = await this.#getDirectoriesIn(path);

    return directories?.find((dir) => dir[prop] === value);
  }

  /**
   * Retrieve many documentation directories by looking for values in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {ReadonlyArray<DocDirectoryInput[P]>} values - The values to looking for.
   * @param {string} [parentPath] - The parent relative path.
   * @returns {Promise<Maybe<DocDirectory[]>>} The matching documentation directories.
   */
  public async getManyDirectory<P extends keyof DocDirectoryInput>(
    prop: P,
    values: ReadonlyArray<DocDirectoryInput[P]>,
    parentPath?: string
  ): Promise<Maybe<DocDirectory[]>> {
    const path = parentPath
      ? join(this.getRootDir(), parentPath)
      : this.getRootDir();
    const directories = await this.#getDirectoriesIn(path);

    return directories?.filter((dir) => values.includes(dir[prop]));
  }

  /**
   * Retrieve the documentation files in a directory.
   *
   * @returns {Promise<Maybe<DirectoryContents>>} The documentation files.
   */
  async #getFilesIn(path: string): Promise<Maybe<DocFile[]>> {
    const dirContents = await this.getContentsOf(path);

    return dirContents?.files.map((file) => this.#convert(file));
  }

  /**
   * Retrieve a documentation file by looking for a value in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {DocFileInput[P]} value - The value to looking for.
   * @returns {Promise<Maybe<DocFile>>} The matching documentation file.
   */
  public async getFile<P extends keyof DocFileInput>(
    prop: P,
    value: DocFileInput[P]
  ): Promise<Maybe<DocFile>> {
    const relativePath = prop === 'id' ? decodeBase64String(value) : value;
    const parent = this.#getParentOf(relativePath);
    const path = parent?.path
      ? join(this.getRootDir(), parent.path)
      : this.getRootDir();
    const files = await this.#getFilesIn(path);

    return files?.find((file) => file[prop] === value);
  }

  /**
   * Retrieve many documentation files by looking for values in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {ReadonlyArray<DocFileInput[P]>} values - The values to looking for.
   * @param {string} [parentPath] - The parent relative path.
   * @returns {Promise<Maybe<DocFile[]>>} The matching documentation files.
   */
  public async getManyFile<P extends keyof DocFileInput>(
    prop: P,
    values: ReadonlyArray<DocFileInput[P]>,
    parentPath?: string
  ): Promise<Maybe<DocFile[]>> {
    const path = parentPath
      ? join(this.getRootDir(), parentPath)
      : this.getRootDir();
    const files = await this.#getFilesIn(path);

    return files?.filter((file) => values.includes(file[prop]));
  }

  /**
   * Filter the documentation entries.
   *
   * @param {T[]} entries - The entries.
   * @param {W} where - The filter parameters.
   * @returns {T[]} The filtered entries.
   */
  #filter<
    T extends DocDirectory | DocFile,
    W extends
      | DocDirectoryWhereFields
      | DocFileWhereFields = T extends DocDirectory
      ? DocDirectoryWhereFields
      : DocFileWhereFields
  >(entries: T[], { createdAt, name, updatedAt }: Omit<W, 'path'>): T[] {
    let filteredDocEntries = entries.slice(0);

    if (createdAt)
      filteredDocEntries = filteredDocEntries.filter(
        (page) => page.createdAt === createdAt
      );

    if (name)
      filteredDocEntries = filteredDocEntries.filter((page) =>
        page.name.includes(name)
      );

    if (updatedAt)
      filteredDocEntries = filteredDocEntries.filter(
        (page) => page.updatedAt === updatedAt
      );

    return filteredDocEntries;
  }

  /**
   * Order the given documentation entries.
   *
   * @param {T[]} entries - The documentation entries.
   * @param {OrderBy<F>} orderBy - The order by instructions.
   * @returns {T[]} The ordered documentation entries.
   */
  #order<
    T extends DocDirectory | DocFile,
    F = T extends DocDirectory ? DocDirectoryOrderFields : DocFileOrderFields
  >(entries: T[], { direction, field }: OrderBy<F>): T[] {
    let orderedDocEntries = entries.slice(0);

    switch (field) {
      case 'createdAt':
        orderedDocEntries = orderedDocEntries.sort(byCreatedAtProp);
        break;
      case 'name':
        orderedDocEntries = orderedDocEntries.sort(byNameProp);
        break;
      case 'path':
        orderedDocEntries = orderedDocEntries.sort(byPathProp);
        break;
      case 'updatedAt':
        orderedDocEntries = orderedDocEntries.sort(byUpdatedAtProp);
        break;
      default:
        break;
    }

    return direction === 'ASC'
      ? orderedDocEntries
      : orderedDocEntries.reverse();
  }

  /**
   * Find the documentation entries matching the given parameters.
   *
   * @param {ListInput<T>} params - The list parameters.
   * @returns {Promise<ListReturn<T[]>>} The matching documentation entries.
   */
  public async find<
    K extends DocEntryKind,
    T extends DocDirectory | DocFile = K extends 'directory'
      ? DocDirectory
      : DocFile
  >(
    kind: K,
    { first, after, orderBy, where }: ListInput<T>
  ): Promise<ListReturn<T[]>> {
    const path = where?.path
      ? join(this.getRootDir(), where.path)
      : this.getRootDir();
    const entries: Maybe<T[]> =
      kind === 'directory'
        ? ((await this.#getDirectoriesIn(path)) as Maybe<T[]>)
        : ((await this.#getFilesIn(path)) as Maybe<T[]>);

    if (!entries)
      return {
        data: undefined,
        total: 0,
      };

    const filteredDocEntries = where ? this.#filter(entries, where) : entries;
    const orderedDocEntries = orderBy
      ? this.#order(filteredDocEntries, orderBy)
      : filteredDocEntries;

    return {
      data: orderedDocEntries.slice(after, (after ?? 0) + first),
      total: orderedDocEntries.length,
    };
  }

  /**
   * Create a new documentation file in the given directory.
   *
   * @param {DocFileCreate} file - The file to write.
   * @returns {Promise<Maybe<DocFile>>} The new documentation file.
   */
  public async create({
    name,
    content,
    parentPath,
  }: DocFileCreate): Promise<Maybe<DocFile>> {
    const basePath = parentPath ?? './';
    const filePath = await this.createMarkdownFile(basePath, name, content);

    return this.getFile('path', this.getRelativePathFrom(filePath));
  }

  /**
   * Update an existing documentation file.
   *
   * @param {DocFileUpdate} data - The data to update.
   * @returns {Promise<Maybe<DocFile>>} The updated documentation file.
   */
  public async updateFile({
    content,
    id,
    name,
    parentPath,
  }: DocFileUpdate): Promise<Maybe<DocFile>> {
    const relativePath = decodeBase64String(id);
    const oldName = parse(relativePath).name;
    const absolutePath = join(this.getRootDir(), relativePath);
    const newAbsolutePath =
      name && oldName !== name
        ? await this.renameFile(name, absolutePath, parentPath)
        : absolutePath;

    if (content)
      await writeFile(newAbsolutePath, content, {
        encoding: 'utf8',
      });

    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);
    const file = await this.getFile('path', newRelativePath);

    return file;
  }
}
