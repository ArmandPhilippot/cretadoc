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
  DocEntryParent,
  DocFile,
  DocFileInput,
  DocFileOrderFields,
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
   * @param {string} [parentPath] - The parent relative path.
   * @returns {Promise<Maybe<DocFile>>} The matching documentation file.
   */
  public async getFile<P extends keyof DocFileInput>(
    prop: P,
    value: DocFileInput[P],
    parentPath?: string
  ): Promise<Maybe<DocFile>> {
    const path = parentPath
      ? join(this.getRootDir(), parentPath)
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
   * Filter the documentation files.
   *
   * @param {DocFile[]} files - The files.
   * @param {DocFileWhereFields} where - The filter parameters.
   * @returns {DocFile[]} The filtered files.
   */
  #filter(
    files: DocFile[],
    { createdAt, name, updatedAt }: Omit<DocFileWhereFields, 'path'>
  ): DocFile[] {
    let filteredDocFiles = files.slice(0);

    if (createdAt)
      filteredDocFiles = filteredDocFiles.filter(
        (page) => page.createdAt === createdAt
      );

    if (name)
      filteredDocFiles = filteredDocFiles.filter((page) =>
        page.name.includes(name)
      );

    if (updatedAt)
      filteredDocFiles = filteredDocFiles.filter(
        (page) => page.updatedAt === updatedAt
      );

    return filteredDocFiles;
  }

  /**
   * Order the given documentation files.
   *
   * @param {DocFile[]} files - The documentation files.
   * @param {OrderBy<DocFileOrderFields>} orderBy - The order by instructions.
   * @returns {DocFile[]} The ordered documentation files.
   */
  #order(
    files: DocFile[],
    { direction, field }: OrderBy<DocFileOrderFields>
  ): DocFile[] {
    let orderedDocFiles = files.slice(0);

    switch (field) {
      case 'createdAt':
        orderedDocFiles = orderedDocFiles.sort(byCreatedAtProp);
        break;
      case 'name':
        orderedDocFiles = orderedDocFiles.sort(byNameProp);
        break;
      case 'path':
        orderedDocFiles = orderedDocFiles.sort(byPathProp);
        break;
      case 'updatedAt':
        orderedDocFiles = orderedDocFiles.sort(byUpdatedAtProp);
        break;
      default:
        break;
    }

    return direction === 'ASC' ? orderedDocFiles : orderedDocFiles.reverse();
  }

  /**
   * Find the documentation files matching the given parameters.
   *
   * @param {ListInput<DocFile>} params - The list parameters.
   * @returns {Promise<ListReturn<DocFile[]>>} The matching documentation files.
   */
  public async find({
    first,
    after,
    orderBy,
    where,
  }: ListInput<DocFile>): Promise<ListReturn<DocFile[]>> {
    const path = where?.path
      ? join(this.getRootDir(), where.path)
      : this.getRootDir();
    const files = await this.#getFilesIn(path);

    if (!files)
      return {
        data: undefined,
        total: 0,
      };

    const filteredDocFiles = where ? this.#filter(files, where) : files;
    const orderedDocFiles = orderBy
      ? this.#order(filteredDocFiles, orderBy)
      : filteredDocFiles;

    return {
      data: orderedDocFiles.slice(after, after + first),
      total: orderedDocFiles.length,
    };
  }
}
