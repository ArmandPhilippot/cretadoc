import { basename, join, parse } from 'path';
import type { RegularFile } from '@cretadoc/read-dir';
import type { Maybe, Nullable } from '@cretadoc/utils';
import { FileSystemRepository } from '../../repositories/filesystem.repository';
import type { DocEntryParent, DocFile, DocFileInput } from '../../types';
import { generateBase64String } from '../../utils/helpers';

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
   * Convert a RegularFile object to a DocFile object.
   *
   * @param {RegularFile} file - An object.
   * @returns {DocFile} A DocFile object.
   */
  #convertRegularFileToDocFile({
    createdAt,
    name,
    path,
    type,
    updatedAt,
    content,
  }: RegularFile): DocFile {
    const relativePath = path.replace(this.getRootDir(), './');

    return {
      content,
      createdAt,
      id: generateBase64String(relativePath),
      name,
      parent: this.#getParentOf(relativePath),
      path: relativePath,
      type,
      updatedAt,
    };
  }

  /**
   * Retrieve the documentation files in a directory.
   *
   * @returns {Promise<Maybe<DirectoryContents>>} The documentation files.
   */
  async #getFilesIn(path: string): Promise<Maybe<DocFile[]>> {
    const dirContents = await this.getContentsOf(path);

    return dirContents?.files.map((file) =>
      this.#convertRegularFileToDocFile(file)
    );
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
}
