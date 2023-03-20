import { mkdir, writeFile } from 'fs/promises';
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
  DocDirectoryCreate,
  DocDirectoryInput,
  DocDirectoryOrderFields,
  DocDirectoryUpdate,
  DocDirectoryWhereFields,
  DocEntry,
  DocEntryInput,
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

type DocInput = DocDirectoryInput | DocEntryInput | DocFileInput;

type DocReturn = DocDirectory | DocEntry | DocFile;

type GetManyOptions<K extends Maybe<DocEntryKind>> = {
  kind?: K;
  parentPath?: string;
};

type ResolveReturnTypeFrom<Kind extends Maybe<DocEntryKind>> =
  Kind extends 'directory'
    ? DocDirectory
    : Kind extends 'file'
    ? DocFile
    : DocEntry;

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
   * @param {Maybe<DirectoryContents>} contents - An object.
   * @returns {Maybe<DirectoryContents>} The converted object.
   */
  #convertDirectoryContents(
    contents: Maybe<DirectoryContents>
  ): Maybe<DirectoryContents> {
    if (!contents) return undefined;

    return {
      directories: contents.directories.map((dir) => this.#convert(dir)),
      files: contents.files.map((file) => this.#convert(file)),
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
  >({ createdAt, name, path, type, updatedAt, contents }: T): R {
    const relativePath = path.replace(this.getRootDir(), './');

    return {
      contents:
        type === 'directory'
          ? this.#convertDirectoryContents(contents)
          : contents,
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
   * Retrieve the converted documentation directories from a directory contents.
   *
   * @param {Maybe<DirectoryContents>} contents - The directory contents.
   * @returns {Maybe<DocDirectory[]>} The documentation directories.
   */
  #getDirectoriesFrom(
    contents: Maybe<DirectoryContents>
  ): Maybe<DocDirectory[]> {
    return contents?.directories.map((dir) => this.#convert(dir));
  }

  /**
   * Retrieve the documentation directories in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<Maybe<DocDirectory[]>>} The documentation directories.
   */
  async #getDirectoriesIn(path: string): Promise<Maybe<DocDirectory[]>> {
    const dirContents = await this.getContentsOf(path);

    return this.#getDirectoriesFrom(dirContents);
  }

  /**
   * Retrieve the converted documentation files from a directory contents.
   *
   * @param {Maybe<DirectoryContents>} contents - The directory contents.
   * @returns {Maybe<DocFile[]>} The documentation files.
   */
  #getFilesFrom(contents: Maybe<DirectoryContents>): Maybe<DocFile[]> {
    return contents?.files.map((file) => this.#convert(file));
  }

  /**
   * Retrieve the documentation files in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<Maybe<DocFile[]>>} The documentation files.
   */
  async #getFilesIn(path: string): Promise<Maybe<DocFile[]>> {
    const dirContents = await this.getContentsOf(path);

    return this.#getFilesFrom(dirContents);
  }

  /**
   * Retrieve the documentation entries in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<DocEntry[]>} The doc entries.
   */
  async #getEntriesIn(path: string): Promise<DocEntry[]> {
    const dirContents = await this.getContentsOf(path);
    const docDirectories = this.#getDirectoriesFrom(dirContents) ?? [];
    const docFiles = this.#getFilesFrom(dirContents) ?? [];

    return [...docDirectories, ...docFiles];
  }

  /**
   * Retrieve the expected entries in a directory path.
   *
   * @param {string} path - A directory path.
   * @param {DocEntryKind} [kind] - The expected entry kind.
   * @returns {Promise<Maybe<DocDirectory[] | DocFile[]> | DocEntry[]>}
   */
  async #findEntriesIn(
    path: string,
    kind?: DocEntryKind
  ): Promise<Maybe<DocDirectory[] | DocFile[]> | DocEntry[]> {
    if (kind === 'directory') return this.#getDirectoriesIn(path);
    if (kind === 'file') return this.#getFilesIn(path);
    return this.#getEntriesIn(path);
  }

  /**
   * Retrieve a documentation entry by looking for a value in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {DocInput[P]} value - The value to looking for.
   * @param {DocEntryKind} [kind] - The expected entry kind.
   * @returns {Promise<Maybe<DocReturn>>} The matching documentation entry.
   */
  public async get<K extends undefined, P extends keyof DocEntryInput>(
    prop: P,
    value: DocInput[P],
    kind?: K
  ): Promise<Maybe<DocEntry>>;
  public async get<K extends 'directory', P extends keyof DocDirectoryInput>(
    prop: P,
    value: DocInput[P],
    kind?: K
  ): Promise<Maybe<DocDirectory>>;
  public async get<K extends 'file', P extends keyof DocFileInput>(
    prop: P,
    value: DocInput[P],
    kind?: K
  ): Promise<Maybe<DocFile>>;
  public async get<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    value: DocInput[P],
    kind?: K
  ): Promise<Maybe<DocReturn>>;
  public async get<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    value: DocInput[P],
    kind?: K
  ): Promise<Maybe<DocReturn>> {
    const relativePath = prop === 'id' ? decodeBase64String(value) : value;
    const parent = this.#getParentOf(relativePath);
    const path = parent?.path
      ? join(this.getRootDir(), parent.path)
      : this.getRootDir();
    const entries = await this.#findEntriesIn(path, kind);

    return entries?.find((entry) => entry[prop] === value);
  }

  /**
   * Retrieve many documentation entries by looking for values in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {ReadonlyArray<DocInput[P]>} values - The values to looking for.
   * @param {GetManyOptions<K>} [options] - Some options.
   * @returns {Promise<Maybe<R[]>>} The matching documentation entries.
   */
  public async getMany<K extends undefined, P extends keyof DocEntryInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    options?: GetManyOptions<K>
  ): Promise<Maybe<DocEntry[]>>;
  public async getMany<
    K extends 'directory',
    P extends keyof DocDirectoryInput
  >(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    options?: GetManyOptions<K>
  ): Promise<Maybe<DocDirectory[]>>;
  public async getMany<K extends 'file', P extends keyof DocFileInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    options?: GetManyOptions<K>
  ): Promise<Maybe<DocFile[]>>;
  public async getMany<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    options?: GetManyOptions<K>
  ): Promise<Maybe<DocReturn[]>>;
  public async getMany<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    options?: GetManyOptions<K>
  ): Promise<Maybe<DocReturn[]>> {
    const { kind, parentPath } = options ?? {
      kind: undefined,
      parentPath: undefined,
    };
    const path = parentPath
      ? join(this.getRootDir(), parentPath)
      : this.getRootDir();
    const entries = await this.#findEntriesIn(path, kind);

    return entries?.filter((entry) => values.includes(entry[prop]));
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
   * @param {K} [kind] - The expected entries kind.
   * @returns {Promise<ListReturn<T[]>>} The matching documentation entries.
   */
  public async find<
    K extends DocEntryKind,
    T extends DocDirectory | DocEntry | DocFile = ResolveReturnTypeFrom<K>
  >(
    { first, after, orderBy, where }: ListInput<T>,
    kind?: K
  ): Promise<ListReturn<T[]>> {
    const path = where?.path
      ? join(this.getRootDir(), where.path)
      : this.getRootDir();
    const entries: Maybe<T[]> = (await this.#findEntriesIn(
      path,
      kind
    )) as Maybe<T[]>;

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
   * Create a new documentation directory in the given directory.
   *
   * @param {DocDirectoryCreate} directory - The directory to write.
   * @returns {Promise<Maybe<DocDirectory>>} The new documentation directory.
   */
  public async createDirectory({
    name,
    parentPath,
  }: DocDirectoryCreate): Promise<Maybe<DocDirectory>> {
    const relativeParentPath = parentPath ?? './';
    const dirPath = join(this.getRootDir(), relativeParentPath, name);
    await mkdir(dirPath, { recursive: true });

    return this.get('path', this.getRelativePathFrom(dirPath), 'directory');
  }

  /**
   * Update an existing documentation directory.
   *
   * @param {DocDirectoryUpdate} data - The data to update.
   * @returns {Promise<Maybe<DocDirectory>>} The updated doc directory.
   */
  public async updateDirectory({
    id,
    name,
    parentPath,
  }: DocDirectoryUpdate): Promise<Maybe<DocDirectory>> {
    const currentRelativePath = decodeBase64String(id);
    const currentName = parse(currentRelativePath).name;
    const absolutePath = join(this.getRootDir(), currentRelativePath);
    const newAbsolutePath =
      name || parentPath
        ? await this.renameFile(name ?? currentName, absolutePath, parentPath)
        : absolutePath;

    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);
    const dir = await this.get('path', newRelativePath, 'directory');

    return dir;
  }

  /**
   * Create a new documentation file in the given directory.
   *
   * @param {DocFileCreate} file - The file to write.
   * @returns {Promise<Maybe<DocFile>>} The new documentation file.
   */
  public async createFile({
    name,
    contents,
    parentPath,
  }: DocFileCreate): Promise<Maybe<DocFile>> {
    const basePath = parentPath ?? './';
    const filePath = await this.createMarkdownFile(basePath, name, contents);

    return this.get('path', this.getRelativePathFrom(filePath), 'file');
  }

  /**
   * Update an existing documentation file.
   *
   * @param {DocFileUpdate} data - The data to update.
   * @returns {Promise<Maybe<DocFile>>} The updated documentation file.
   */
  public async updateFile({
    contents,
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

    if (contents)
      await writeFile(newAbsolutePath, contents, {
        encoding: 'utf8',
      });

    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);
    const file = await this.get('path', newRelativePath, 'file');

    return file;
  }
}
