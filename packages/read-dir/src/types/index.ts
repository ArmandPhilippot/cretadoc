export const FILE_TYPES = ['directory', 'file', 'unknown'] as const;
export const VALID_FILE_TYPES = ['directory', 'file'] as const;

export type FileType = (typeof FILE_TYPES)[number];
export type ValidFileType = (typeof VALID_FILE_TYPES)[number];
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
  content?: T extends 'directory' ? DirectoryContents : string;
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

export type Directory = RegularFileOrDirectory<'directory'>;
export type RegularFile = RegularFileOrDirectory<'file'>;

export type ReadDirOptions = {
  /**
   * Define the maximum number of recursion.
   *
   * @default undefined
   */
  depth: number | undefined;
  /**
   * Only include files with the given extensions.
   *
   * @default undefined
   */
  extensions: Extension[] | undefined;
  /**
   * Should we include the contents of the files?
   *
   * @default false
   */
  includeFileContents: boolean;
};
