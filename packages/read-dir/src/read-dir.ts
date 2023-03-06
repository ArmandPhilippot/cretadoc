import type { Dirent } from 'fs';
import { readdir, stat } from 'fs/promises';
import { basename, extname, join, sep } from 'path';
import type {
  Directory,
  DirectoryContents,
  Extension,
  FileType,
  RegularFile,
  ValidFileType,
} from './types';

/**
 * Retrieve the file type of a directory entry.
 *
 * @param {Dirent} entry - A directory entry.
 * @returns {FileType} The matching file type.
 */
const getFileTypeOf = (entry: Dirent): FileType => {
  if (entry.isDirectory()) return 'directory';
  if (entry.isFile()) return 'file';
  return 'unknown';
};

type EntryPathAndType = {
  path: string;
  type: FileType;
};

/**
 * Retrieve the path and types of each directory entries.
 *
 * @param {Dirent[]} entries - The directory entries.
 * @param {string} parent - The parent path.
 * @returns {EntryPathAndType[]} The path and type of each entries.
 */
const getPathAndTypeFrom = (
  entries: Dirent[],
  parent: string
): EntryPathAndType[] =>
  entries.map((entry) => {
    const fileType = getFileTypeOf(entry);

    return {
      path: join(parent, entry.name),
      type: fileType,
    };
  });

type ValidEntryPathAndType = {
  path: string;
  type: ValidFileType;
};

/**
 * Method to filter an array and remove entries with `unknown` type.
 *
 * @param {EntryPathAndType} entry - A object with path and type.
 * @returns {boolean} True if it is a `ValidEntryPathAndType` object.
 */
const removeEntriesWithUnknownType = (
  entry: EntryPathAndType
): entry is ValidEntryPathAndType => {
  if (entry.type === 'unknown') return false;
  return true;
};

type Dates = {
  createdAt: string;
  updatedAt: string;
};

/**
 * Retrieve the creation date and the update date of a path.
 *
 * @param {string} path - The absolute path of a file.
 * @returns {Promise<Dates>} The creation date and the update date.
 */
const getDatesFrom = async (path: string): Promise<Dates> => {
  const { birthtime, mtime } = await stat(path);

  return {
    createdAt: birthtime.toISOString(),
    updatedAt: mtime.toISOString(),
  };
};

/**
 * Transform a path to a buffer.
 *
 * @param {string} path - A path.
 * @returns {string} An id.
 */
const generateIdFrom = (path: string) => Buffer.from(path).toString('base64');

/**
 * Retrieve an array of directories and regular files.
 *
 * @param {ValidEntryPathAndType[]} entries - An array of path and file type.
 * @returns {Promise<Array<Directory | RegularFile>>} The directories and files.
 */
const getDirAndFilesFrom = async (
  entries: ValidEntryPathAndType[]
): Promise<Array<Directory | RegularFile>> => {
  const promises = entries.map(async ({ path, type }) => {
    const { createdAt, updatedAt } = await getDatesFrom(path);
    const extension = extname(path) as Extension;

    const fileOrDir:
      | Omit<Directory, 'extension' | 'type'>
      | Omit<RegularFile, 'extension' | 'type'> = {
      createdAt,
      id: generateIdFrom(path),
      name: basename(path).replace(extension, ''),
      path,
      updatedAt,
    };

    if (type === 'directory') return { ...fileOrDir, type };
    return { ...fileOrDir, extension, type };
  });

  return Promise.all(promises);
};

/**
 * Method to filter an array and remove Directory objects.
 *
 * @param {Directory | RegularFile} dirOrFile - A Directory or RegularFile obj.
 * @returns {boolean} True if it is a RegularFile.
 */
const removeDirectories = (
  dirOrFile: Directory | RegularFile
): dirOrFile is RegularFile => {
  if (dirOrFile.type === 'directory') return false;
  return true;
};

/**
 * Method to filter an array and remove RegularFile objects.
 *
 * @param {Directory | RegularFile} dirOrFile - A Directory or RegularFile obj.
 * @returns {boolean} True if it is a Directory.
 */
const removeRegularFiles = (
  dirOrFile: Directory | RegularFile
): dirOrFile is Directory => {
  if (dirOrFile.type === 'file') return false;
  return true;
};

/**
 * Retrieve all the contents from a directory.
 *
 * @param {string} path - The directory path.
 * @returns {Promise<DirectoryContents>} The directory contents.
 */
const getDirContents = async (path: string): Promise<DirectoryContents> => {
  const dirEntries = await readdir(path, {
    encoding: 'utf8',
    withFileTypes: true,
  });
  const entriesPathAndType = getPathAndTypeFrom(dirEntries, path);
  const validEntries = entriesPathAndType.filter(removeEntriesWithUnknownType);
  const directoriesAndFiles = await getDirAndFilesFrom(validEntries);

  return {
    directories: directoriesAndFiles.filter(removeRegularFiles),
    files: directoriesAndFiles.filter(removeDirectories),
  };
};

/**
 * Remove the root path from a directory or regular file path.
 *
 * @param {T} fileOrDir - Either a directory or a regular file.
 * @param {string} rootPath - The root path.
 * @returns {T} Either the directory or regular file with truncated path.
 */
const removeRootPathFrom = <T extends Directory | RegularFile>(
  fileOrDir: T,
  rootPath: string
): T => {
  const path = fileOrDir.path.replace(rootPath, `.${sep}`);

  return {
    ...fileOrDir,
    id: generateIdFrom(path),
    path,
  };
};

/**
 * Walk through a directory.
 *
 * @param {string} path - The directory path.
 * @returns {Promise<DirectoryContents>} The directory contents.
 */
export const readDir = async (path: string): Promise<DirectoryContents> => {
  const dirContents = await getDirContents(path);

  return {
    directories: dirContents.directories.map((dir) =>
      removeRootPathFrom(dir, path)
    ),
    files: dirContents.files.map((file) => removeRootPathFrom(file, path)),
  };
};
