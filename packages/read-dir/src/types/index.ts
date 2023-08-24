import type { Maybe, Simplify } from '@cretadoc/utils';

export type FileType = 'directory' | 'file' | 'unknown';
export type ValidFileType = 'directory' | 'file';
export type Extension = `.${string}` | '';

export type Dates = {
  /**
   * The creation date registered by the filesystem.
   */
  createdAt: string;
  /**
   * The update date registered by the filesystem.
   */
  updatedAt: string;
};

export type DirectoryContents = {
  /**
   * The subdirectories inside the directory.
   */
  directories: Directory[];
  /**
   * The regular files inside the directory.
   */
  files: RegularFile[];
};

export type RegularFileOrDirectory<T extends ValidFileType> = Dates & {
  /**
   * The file or directory contents.
   */
  contents?: T extends 'directory' ? DirectoryContents : string;
  /**
   * The file extension.
   */
  extension?: T extends 'file' ? Extension : never;
  /**
   * The file or directory id.
   */
  id: string;
  /**
   * The filename.
   */
  name: string;
  /**
   * The path of the file or directory.
   */
  path: string;
  /**
   * The filetype.
   */
  type: T;
};

export type Directory = Simplify<RegularFileOrDirectory<'directory'>>;
export type RegularFile = Simplify<RegularFileOrDirectory<'file'>>;

export type ReadDirOptions = {
  /**
   * Define the maximum number of recursion.
   *
   * @default undefined
   */
  depth: Maybe<number>;
  /**
   * Only include files with the given extensions.
   *
   * @default undefined
   */
  extensions: Maybe<Extension[]>;
  /**
   * Should we include the contents of the files?
   *
   * @default false
   */
  includeFileContents: boolean;
};
