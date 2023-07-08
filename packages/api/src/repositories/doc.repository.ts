import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { basename, join, parse } from 'path';
import type {
  Directory,
  DirectoryContents,
  RegularFile,
} from '@cretadoc/read-dir';
import {
  type Maybe,
  type Nullable,
  isObject,
  isObjKeyExist,
} from '@cretadoc/utils';
import type {
  DocDirectory,
  DocDirectoryContents,
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
  Meta,
} from '../types';
import { DIRECTORY_META_FILENAME } from '../utils/constants';
import {
  decodeBase64String,
  generateBase64String,
  getFilenameWithExt,
  getSlugFrom,
  parseMarkdown,
} from '../utils/helpers';
import { FileSystemRepository } from './filesystem.repository';

type DocInput = DocDirectoryInput | DocEntryInput | DocFileInput;

type DeleteDocEntryInput =
  | DocDirectoryDeleteInput['input']
  | DocFileDeleteInput['input'];

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

/**
 * Check if the given value is a DocEntry.
 *
 * @param {unknown} value - A value to compare.
 * @returns {boolean} True if value is a DocEntry object.
 */
const isDocEntry = (value: unknown): value is DocEntry => {
  if (!value) return false;
  if (!isObject(value)) return false;

  const mandatoryKeys: Array<keyof DocEntry> = [
    'contents',
    'createdAt',
    'id',
    'name',
    'parent',
    'path',
    'slug',
    'type',
    'updatedAt',
  ];

  for (const key of mandatoryKeys) if (!isObjKeyExist(value, key)) return false;

  return true;
};

export class DocRepository extends FileSystemRepository {
  constructor(dir: string) {
    super(dir, 'doc');
  }

  /**
   * Retrieve the parent directory of path if it is not root directory.
   *
   * @param {string} path - A relative path.
   * @returns {Promise<Nullable<DocEntryParent>>} The parent or null.
   */
  async #getParentOf(path: string): Promise<Nullable<DocEntryParent>> {
    const parent = parse(path);

    if (parent.dir === '.') return null;

    const parentDirectory: DocEntryParent = {
      id: generateBase64String(parent.dir),
      name: basename(parent.dir),
      path: parent.dir,
      slug: getSlugFrom(parent.dir),
    };
    const metaFilePath = this.getAbsolutePathFrom(
      join(parent.dir, getFilenameWithExt(DIRECTORY_META_FILENAME))
    );

    if (!existsSync(metaFilePath)) return parentDirectory;

    const metaFileContents = await readFile(metaFilePath, { encoding: 'utf8' });
    const { meta } = parseMarkdown(metaFileContents);

    return {
      ...parentDirectory,
      meta,
    };
  }

  /**
   * Convert the directory contents.
   *
   * @param {Maybe<DirectoryContents>} contents - An object.
   * @returns {Promise<DocDirectoryContents>} The converted contents.
   */
  async #convertDirectoryContents(
    contents: Maybe<DirectoryContents>
  ): Promise<DocDirectoryContents> {
    if (!contents) return { directories: [], files: [] };

    const dirPromises = contents.directories.map(async (dir) =>
      this.#convert(dir)
    );
    const filesPromises = contents.files
      .filter((file) => file.name !== DIRECTORY_META_FILENAME)
      .map(async (file) => this.#convert(file));

    return {
      directories: await Promise.all(dirPromises),
      files: await Promise.all(filesPromises),
    };
  }

  /**
   * Retrieve the contents of a directory.
   *
   * @param {string} dir - A directory path.
   * @returns {Promise<DocDirectoryContents>} The directory contents.
   */
  protected override async getContentsOf(
    dir: string
  ): Promise<DocDirectoryContents> {
    const dirContents = await super.getContentsOf(dir);

    return this.#convertDirectoryContents(dirContents);
  }

  /**
   * Retrieve the meta of a directory from its contents.
   *
   * @param {Maybe<DirectoryContents>} contents - The directory contents.
   * @returns {Maybe<Meta>} The directory meta.
   */
  protected getDirectoryMetaFrom(
    contents: Maybe<DirectoryContents>
  ): Maybe<Meta> {
    if (!contents) return undefined;

    const files = [...contents.files];
    const metaFileIndex = files.findIndex(
      (file) => file.name === DIRECTORY_META_FILENAME
    );

    if (metaFileIndex === -1) return undefined;

    const extractedFiles = files.splice(metaFileIndex, 1);
    const metaFile = extractedFiles[0];

    if (!metaFile?.contents) return {};

    const { meta } = parseMarkdown(metaFile.contents);

    return meta;
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
    createdAt,
    name,
    path,
    type,
    updatedAt,
    contents,
  }: T): Promise<DocDirectory | DocFile> {
    const relativePath = this.getRelativePathFrom(path);
    const slug = getSlugFrom(relativePath);
    const parent = await this.#getParentOf(relativePath);
    const commonData: Omit<DocDirectory | DocFile, 'contents' | 'type'> = {
      createdAt,
      id: generateBase64String(relativePath),
      name,
      parent,
      path: relativePath,
      slug,
      updatedAt,
    };

    if (type === 'directory')
      return {
        ...commonData,
        contents: await this.#convertDirectoryContents(contents),
        meta: this.getDirectoryMetaFrom(contents),
        type: 'directory',
      };

    const { content, meta } = parseMarkdown(contents ?? '');

    return {
      ...commonData,
      contents: content,
      meta,
      type: 'file',
    };
  }

  /**
   * Retrieve the documentation directories in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<DocDirectory[]>} The documentation directories.
   */
  async #getDirectoriesIn(path: string): Promise<DocDirectory[]> {
    const dirContents = await this.getContentsOf(path);

    return dirContents.directories;
  }

  /**
   * Retrieve the documentation files in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<DocFile[]>} The documentation files.
   */
  async #getFilesIn(path: string): Promise<DocFile[]> {
    const dirContents = await this.getContentsOf(path);

    return dirContents.files;
  }

  /**
   * Retrieve the documentation entries in the given path.
   *
   * @param {string} path - A directory path.
   * @returns {Promise<DocEntry[]>} The doc entries.
   */
  async #getEntriesIn(path: string): Promise<DocEntry[]> {
    const { directories, files } = await this.getContentsOf(path);

    return [...directories, ...files];
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
    const dirContents = await this.getContentsOf(this.getRootDir());
    let entry: Maybe<DocEntry> = undefined;

    JSON.stringify(dirContents, (_, currentValue: unknown) => {
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
    const dirContents = await this.getContentsOf(this.getRootDir());
    const entries: DocEntry[] = [];

    JSON.stringify(dirContents, (_, value: unknown) => {
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
      ? ((await this.#getEntriesIn(path)) as T[])
      : ((await this.#findEntriesIn<K>(path, kind)) as T[]);
    const filteredDocEntries = this.filter(entries, where, kind);

    return this.order(filteredDocEntries, orderBy);
  }

  /**
   * Create a new documentation directory in the given directory.
   *
   * @param {DocDirectoryCreate} directory - The directory to write.
   * @returns {Promise<Maybe<DocDirectory>>} The new documentation directory.
   */
  public async createDirectory({
    meta,
    name,
    parentPath,
  }: DocDirectoryCreate): Promise<Maybe<DocDirectory>> {
    const relativeParentPath = parentPath ?? './';
    const dirPath = join(this.getRootDir(), relativeParentPath, name);
    await mkdir(dirPath, { recursive: true });
    const relativePath = this.getRelativePathFrom(dirPath);
    await this.createFile({
      name: getFilenameWithExt(DIRECTORY_META_FILENAME),
      meta,
      parentPath: relativePath,
    });

    return this.get('path', relativePath, 'directory');
  }

  /**
   * Update the meta of a directory.
   *
   * @param {string} dirPath - The relative directory path.
   * @param {Meta} meta - The meta
   */
  async #updateDirectoryMeta(dirPath: string, meta: Meta) {
    const metaAbsolutePath = this.getAbsolutePathFrom(
      join(dirPath, getFilenameWithExt(DIRECTORY_META_FILENAME))
    );

    if (existsSync(metaAbsolutePath))
      await this.update(metaAbsolutePath, { meta });
    else
      await this.createMarkdownFile({
        name: DIRECTORY_META_FILENAME,
        meta,
        parentPath: dirPath,
      });
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

    if (meta) await this.#updateDirectoryMeta(newRelativePath, meta);

    return this.get('path', newRelativePath, 'directory');
  }

  /**
   * Create a new documentation file in the given directory.
   *
   * @param {DocFileCreate} file - The file to write.
   * @returns {Promise<Maybe<DocFile>>} The new documentation file.
   */
  public async createFile({
    contents,
    meta,
    name,
    parentPath,
  }: DocFileCreate): Promise<Maybe<DocFile>> {
    const filePath = await this.createMarkdownFile({
      contents,
      meta,
      name,
      parentPath,
    });

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
    meta,
    name,
    parentPath,
  }: DocFileUpdate): Promise<Maybe<DocFile>> {
    const relativePath = decodeBase64String(id);
    const absolutePath = this.getAbsolutePathFrom(relativePath);
    const newAbsolutePath = await this.update(absolutePath, {
      contents,
      meta,
      name,
      parentPath,
    });
    const newRelativePath = this.getRelativePathFrom(newAbsolutePath);

    return this.get('path', newRelativePath, 'file');
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
}
