import type { FILE_TYPES, VALID_FILE_TYPES } from '../utils/constants';

export type FileType = (typeof FILE_TYPES)[number];
export type ValidFileType = (typeof VALID_FILE_TYPES)[number];
export type Extension = `.${string}` | '';

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

export type RegularFileOrDirectory<T extends ValidFileType> = {
  /**
   * The creation date registered by the filesystem.
   */
  createdAt: string;
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
  /**
   * The update date registered by the filesystem.
   */
  updatedAt: string;
};

export type Directory = RegularFileOrDirectory<'directory'>;
export type RegularFile = RegularFileOrDirectory<'file'>;
