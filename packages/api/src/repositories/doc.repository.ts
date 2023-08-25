import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { basename, join, parse } from 'path';
import type {
  Directory,
  DirectoryContents,
  RegularFile,
} from '@cretadoc/read-dir';
import type { Maybe, Nullable } from '@cretadoc/utils';
import type {
  DocDirectory,
  DocDirectoryCreate,
  DocDirectoryDeleteInput,
  DocDirectoryInput,
  DocDirectoryUpdate,
  DocEntry,
  DocEntryInput,
  DocEntryKind,
  DocEntryParent,
  DocFile,
  DocFileCreate,
  DocFileDeleteInput,
  DocFileInput,
  DocFileUpdate,
  ListInput,
} from '../types';
import { DIRECTORY_INDEX_FILENAME } from '../utils/constants';
import {
  type MarkdownData,
  generateBase64String,
  getFilenameWithExt,
  getSlugFrom,
  parseMarkdown,
  isDocEntry,
  decodeBase64String,
} from '../utils/helpers';
import { FileSystemRepository } from './filesystem.repository';

type DeleteDocEntryInput =
  | DocDirectoryDeleteInput['input']
  | DocFileDeleteInput['input'];

type DocInput = DocDirectoryInput | DocEntryInput | DocFileInput;

type EntryCommonData = Omit<
  DocDirectory | DocFile,
  'contents' | 'entries' | 'meta' | 'type'
>;

type ResolveReturnTypeFrom<Kind extends Maybe<DocEntryKind>> =
  Kind extends 'directory'
    ? DocDirectory
    : Kind extends 'file'
    ? DocFile
    : DocEntry;

type FindParams<
  T extends DocEntry,
  K extends Maybe<DocEntryKind> = undefined
> = ListInput<T> & { kind?: K };

export class DocRepository extends FileSystemRepository {
  constructor(dir: string) {
    super(dir, 'doc');
  }

  /**
   * Retrieve the contents and meta from directory index file.
   *
   * @param {string} dir - A relative path.
   * @returns {Promise<Maybe<MarkdownData>> } The contents and meta from index
   */
  async #getDirIndexData(dir: string): Promise<Maybe<MarkdownData>> {
    const indexFilePath = this.getAbsolutePathFrom(
      join(dir, getFilenameWithExt(DIRECTORY_INDEX_FILENAME))
    );

    if (!existsSync(indexFilePath)) return undefined;

    const indexFileContents = await readFile(indexFilePath, {
      encoding: 'utf8',
    });

    return parseMarkdown(indexFileContents);
  }

  /**
   * Retrieve the parent directory of path if it is not root directory.
   *
   * @param {string} path - A relative path.
   * @returns {Promise<Nullable<DocEntryParent>>} The parent or null.
   */
  async #getParentOf(path: string): Promise<Nullable<DocEntryParent>> {
    const parent = parse(path);

    if (parent.dir === '.' || path === './') return null;

    const parentDir: Omit<DocEntryParent, 'meta'> = {
      id: generateBase64String(parent.dir),
      name: basename(parent.dir),
      path: parent.dir,
      slug: getSlugFrom(parent.dir),
    };
    const parentData = await this.#getDirIndexData(parent.dir);

    return {
      ...parentDir,
      meta: parentData?.meta,
    };
  }

  /**
   * Convert the directory contents.
   *
   * @param {Maybe<DirectoryContents>} contents - An object.
   * @returns {Promise<DocEntry[]>} The converted contents.
   */
  async #convertDirContents(
    contents: Maybe<DirectoryContents>
  ): Promise<DocEntry[]> {
    if (!contents) return [];

    const promises = [...contents.directories, ...contents.files]
      .filter((entry) => {
        if (entry.type === 'file')
          return entry.name !== DIRECTORY_INDEX_FILENAME;

        return true;
      })
      .map(async (entry) => this.#convert(entry));

    return Promise.all(promises);
  }

  /**
   * Convert a Directory to a DocDirectory or a RegularFile to a DocFile.
   *
   * @param {Directory | RegularFile} fileOrDir - An object.
   * @returns {Promise<DocDirectory | DocFile>} The converted entry.
   */
  async #convert<T extends Directory>(fileOrDir: T): Promise<DocDirectory>;
  async #convert<T extends RegularFile>(fileOrDir: T): Promise<DocFile>;
  async #convert<T extends Directory | RegularFile>(
    fileOrDir: T
  ): Promise<DocDirectory | DocFile>;
  async #convert<T extends Directory | RegularFile>({
    contents,
    createdAt,
    name,
    path,
    type,
    updatedAt,
  }: T): Promise<DocDirectory | DocFile> {
    const relativePath = this.getRelativePathFrom(path);
    const commonData = {
      createdAt,
      id: generateBase64String(relativePath),
      name,
      parent: await this.#getParentOf(relativePath),
      path: relativePath,
      slug: getSlugFrom(relativePath),
      updatedAt,
    } satisfies EntryCommonData;

    if (type === 'directory') {
      const entries = await this.#convertDirContents(contents);
      const indexData = await this.#getDirIndexData(relativePath);

      return {
        ...commonData,
        ...indexData,
        entries,
        type: 'directory',
      };
    }

    return {
      ...commonData,
      ...parseMarkdown(contents ?? ''),
      type: 'file',
    };
  }

  /**
   * Retrieve the contents of a directory.
   *
   * @param {string} dir - A directory path.
   * @returns {Promise<DocEntry[]>} The directory contents.
   */
  async #getDirContents(dir: string): Promise<DocEntry[]> {
    const dirContents = await this.getContentsOf(dir);

    return this.#convertDirContents(dirContents);
  }

  /**
   * Retrieve the data of the doc directory index.
   *
   * @returns {Promise<DocDirectory>} The root directory.
   */
  async #getRootDirData(): Promise<DocDirectory> {
    const dirIndex = await this.getDataOf(this.getRootDir());

    return this.#convert(dirIndex);
  }

  /**
   * Retrieve a documentation entry by looking for a value in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {DocInput[P]} value - The value to looking for.
   * @param {DocEntryKind} [kind] - The expected entry kind.
   * @returns {Promise<Maybe<DocEntry>>} The matching documentation entry.
   */
  public async get<
    K extends undefined,
    P extends keyof DocEntryInput = keyof DocEntryInput
  >(prop: P, value: DocInput[P], kind?: K): Promise<Maybe<DocEntry>>;
  public async get<
    K extends 'directory',
    P extends keyof DocDirectoryInput = keyof DocDirectoryInput
  >(prop: P, value: DocInput[P], kind?: K): Promise<Maybe<DocDirectory>>;
  public async get<
    K extends 'file',
    P extends keyof DocFileInput = keyof DocFileInput
  >(prop: P, value: DocInput[P], kind?: K): Promise<Maybe<DocFile>>;
  public async get<
    K extends Maybe<DocEntryKind>,
    P extends keyof DocInput = keyof DocInput
  >(prop: P, value: DocInput[P], kind?: K): Promise<Maybe<DocEntry>>;
  public async get<
    K extends Maybe<DocEntryKind>,
    P extends keyof DocInput = keyof DocInput
  >(prop: P, value: DocInput[P], kind?: K): Promise<Maybe<DocEntry>> {
    const rootDir = await this.#getRootDirData();
    let entry: Maybe<DocEntry> = undefined;

    JSON.stringify(rootDir, (_, currentValue: unknown) => {
      if (
        isDocEntry(currentValue) &&
        (!kind || currentValue.type === kind) &&
        currentValue[prop] === value
      )
        entry = currentValue;

      return currentValue;
    });

    return entry;
  }

  /**
   * Retrieve many documentation entries by looking for values in a prop.
   *
   * @param {P} prop - The prop name.
   * @param {ReadonlyArray<DocInput[P]>} values - The values to looking for.
   * @param {K} [kind] - The entry kind.
   * @returns {Promise<Maybe<R[]>>} The matching documentation entries.
   */
  public async getMany<K extends undefined, P extends keyof DocEntryInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    kind?: K
  ): Promise<Maybe<DocEntry[]>>;
  public async getMany<
    K extends 'directory',
    P extends keyof DocDirectoryInput
  >(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    kind?: K
  ): Promise<Maybe<DocDirectory[]>>;
  public async getMany<K extends 'file', P extends keyof DocFileInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    kind?: K
  ): Promise<Maybe<DocFile[]>>;
  public async getMany<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    kind?: K
  ): Promise<Maybe<DocEntry[]>>;
  public async getMany<K extends Maybe<DocEntryKind>, P extends keyof DocInput>(
    prop: P,
    values: ReadonlyArray<DocInput[P]>,
    kind?: K
  ): Promise<Maybe<DocEntry[]>> {
    const rootDir = await this.#getRootDirData();
    const entries: DocEntry[] = [];

    JSON.stringify(rootDir, (_, value: unknown) => {
      if (
        isDocEntry(value) &&
        (!kind || value.type === kind) &&
        values.includes(value[prop])
      )
        entries.push(value);

      return value;
    });

    return entries;
  }

  /**
   * Retrieve the expected entries in a directory path.
   *
   * @param {string} path - A directory path.
   * @param {DocEntryKind} [kind] - The expected entry kind.
   * @returns {Promise<DocDirectory[] | DocFile[] | DocEntry[]>}
   */
  async #findEntriesIn<K extends undefined>(
    path: string,
    kind?: K
  ): Promise<DocEntry[]>;
  async #findEntriesIn<K extends 'directory'>(
    path: string,
    kind?: K
  ): Promise<DocDirectory[]>;
  async #findEntriesIn<K extends 'file'>(
    path: string,
    kind?: K
  ): Promise<DocFile[]>;
  async #findEntriesIn<K extends DocEntryKind>(
    path: string,
    kind?: K
  ): Promise<DocDirectory[] | DocFile[] | DocEntry[]>;
  async #findEntriesIn<K extends DocEntryKind>(
    path: string,
    kind?: K
  ): Promise<DocDirectory[] | DocFile[] | DocEntry[]> {
    const entries = await this.#getDirContents(path);

    if (kind === 'directory')
      return entries.filter(
        (entry): entry is DocDirectory => entry.type === 'directory'
      );

    if (kind === 'file')
      return entries.filter((entry): entry is DocFile => entry.type === 'file');

    return entries;
  }

  /**
   * Find the documentation entries matching the given parameters.
   *
   * @param {FindParams<T, K>} params - The parameters.
   * @returns {Promise<T[]>} The matching documentation entries.
   */
  public async find<
    K extends DocEntryKind,
    T extends DocDirectory | DocEntry | DocFile = ResolveReturnTypeFrom<K>
  >(params?: FindParams<T, K>): Promise<T[]> {
    const { orderBy, where, kind } = params ?? {};
    const path = where?.path
      ? join(this.getRootDir(), where.path)
      : this.getRootDir();
    const entries = where
      ? ((await this.#getDirContents(path)) as T[])
      : ((await this.#findEntriesIn<K>(path, kind)) as T[]);
    const filteredDocEntries = this.filter(entries, where, kind);

    return this.order(filteredDocEntries, orderBy);
  }

  /**
   * Update the index file of a directory.
   *
   * @param {string} dirPath - The relative directory path.
   * @param {Partial<MarkdownData>} data - The data to update.
   */
  async #updateDirectoryIndexFile(
    dirPath: string,
    { contents, excerpt, meta }: Partial<MarkdownData>
  ) {
    const metaAbsolutePath = this.getAbsolutePathFrom(
      join(dirPath, getFilenameWithExt(DIRECTORY_INDEX_FILENAME))
    );

    if (existsSync(metaAbsolutePath))
      await this.update(metaAbsolutePath, { contents, excerpt, meta });
    else
      await this.createMarkdownFile({
        contents,
        excerpt,
        name: DIRECTORY_INDEX_FILENAME,
        meta,
        parentPath: dirPath,
      });
  }

  /**
   * Create a new documentation directory in the given directory.
   *
   * @param {DocDirectoryCreate} directory - The directory to write.
   * @returns {Promise<Maybe<DocDirectory>>} The new documentation directory.
   */
  public async createDirectory({
    contents,
    excerpt,
    meta,
    name,
    parentPath,
  }: DocDirectoryCreate): Promise<Maybe<DocDirectory>> {
    const relativeParentPath = parentPath ?? './';
    const dirPath = join(this.getRootDir(), relativeParentPath, name);
    const relativePath = this.getRelativePathFrom(dirPath);

    await mkdir(dirPath, { recursive: true });
    await this.#updateDirectoryIndexFile(relativePath, {
      contents,
      excerpt,
      meta,
    });

    return this.get('path', relativePath, 'directory');
  }

  /**
   * Create a new documentation file in the given directory.
   *
   * @param {DocFileCreate} file - The file to write.
   * @returns {Promise<Maybe<DocFile>>} The new documentation file.
   */
  public async createFile({
    contents,
    excerpt,
    meta,
    name,
    parentPath,
  }: DocFileCreate): Promise<Maybe<DocFile>> {
    const filePath = await this.createMarkdownFile({
      contents,
      excerpt,
      meta,
      name,
      parentPath,
    });

    return this.get('path', this.getRelativePathFrom(filePath), 'file');
  }

  /**
   * Remove a documentation entry from the repository.
   *
   * @param {DeleteDocEntryInput} input - The entry path or id.
   * @param {DocEntryKind} kind - The entry kind.
   * @returns {Promise<Maybe<DocDirectory | DocFile>>} The deleted entry.
   */
  public async remove<T extends 'directory'>(
    { id, path }: DeleteDocEntryInput,
    kind?: T
  ): Promise<Maybe<DocDirectory>>;
  public async remove<T extends 'file'>(
    { id, path }: DeleteDocEntryInput,
    kind?: T
  ): Promise<Maybe<DocFile>>;
  public async remove<T extends DocEntryKind>(
    { id, path }: DeleteDocEntryInput,
    kind?: T
  ): Promise<Maybe<DocDirectory | DocFile>>;
  public async remove<T extends DocEntryKind>(
    { id, path }: DeleteDocEntryInput,
    kind?: T
  ): Promise<Maybe<DocDirectory | DocFile>> {
    const relativePath = id ? decodeBase64String(id) : path;

    if (!relativePath) return undefined;

    const entry = await this.get('path', relativePath);
    const isDirectory = kind === 'directory';
    const isEntryMatching =
      entry && entry.type === (isDirectory ? 'directory' : 'file');

    if (isEntryMatching) await this.del(relativePath, isDirectory);

    return entry;
  }

  /**
   * Update an existing documentation directory.
   *
   * @param {DocDirectoryUpdate} data - The data to update.
   * @returns {Promise<Maybe<DocDirectory>>} The updated doc directory.
   */
  public async updateDirectory({
    contents,
    excerpt,
    id,
    name,
    meta,
    parentPath,
  }: DocDirectoryUpdate): Promise<Maybe<DocDirectory>> {
    const relativePath = decodeBase64String(id);
    const absolutePath = this.getAbsolutePathFrom(relativePath);
    const newAbsolutePath = await this.update(absolutePath, {
      name,
      parentPath,
    });
    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);

    if (contents || excerpt || meta)
      await this.#updateDirectoryIndexFile(newRelativePath, {
        contents,
        excerpt,
        meta,
      });

    return this.get('path', newRelativePath, 'directory');
  }

  /**
   * Update an existing documentation file.
   *
   * @param {DocFileUpdate} data - The data to update.
   * @returns {Promise<Maybe<DocFile>>} The updated documentation file.
   */
  public async updateFile({
    contents,
    excerpt,
    id,
    meta,
    name,
    parentPath,
  }: DocFileUpdate): Promise<Maybe<DocFile>> {
    const relativePath = decodeBase64String(id);
    const absolutePath = this.getAbsolutePathFrom(relativePath);
    const newAbsolutePath = await this.update(absolutePath, {
      contents,
      excerpt,
      meta,
      name,
      parentPath,
    });
    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);

    return this.get('path', newRelativePath, 'file');
  }
}
