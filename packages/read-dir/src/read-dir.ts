import { readdir, stat } from 'fs/promises';
import { basename, join, parse } from 'path';
import { removeUndefined } from '@cretadoc/utils';
import type {
  Dates,
  Directory,
  DirectoryContents,
  Extension,
  RegularFile,
} from './types';
import { generateIdFrom } from './utils/helpers/strings';

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

type CommonData = Pick<
  Directory | RegularFile,
  'createdAt' | 'id' | 'path' | 'updatedAt'
>;

/**
 * Retrieve the data shared by directories and files.
 * @param {string} path - A directory or file path.
 * @returns {Promise<CommonData>} The common data.
 */
const getCommonData = async (path: string): Promise<CommonData> => {
  const { createdAt, updatedAt } = await getDatesFrom(path);

  return {
    createdAt,
    id: generateIdFrom(path),
    path,
    updatedAt,
  };
};

/**
 * Retrieve a RegularFile object.
 *
 * @param {string} path - The file path.
 * @returns {Promise<RegularFile>} The file data.
 */
const getRegularFile = async (path: string): Promise<RegularFile> => {
  const commonData = await getCommonData(path);
  const { ext, name } = parse(path);
  const extension = ext as Extension;

  return {
    ...commonData,
    extension,
    name,
    type: 'file',
  };
};

/**
 * Retrieve an array of directories and regular files.
 *
 * @param {string} path - The directory path
 * @returns {Promise<Array<Directory | RegularFile>>} The directories and files.
 */
const getDirAndFilesIn = async (
  path: string
): Promise<Array<Directory | RegularFile>> => {
  const dirEntries = await readdir(path, {
    encoding: 'utf8',
    withFileTypes: true,
  });

  const promises = dirEntries.map(async (entry) => {
    const fullPath = join(path, entry.name);

    /* eslint-disable-next-line @typescript-eslint/no-use-before-define -- The
    circular reference is needed to avoid repeats. */
    if (entry.isDirectory()) return getDirectory(fullPath);
    if (entry.isFile()) return getRegularFile(fullPath);
    return undefined;
  });

  const awaitedPromises = await Promise.all(promises);

  return awaitedPromises.filter(removeUndefined);
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
  const dirContents = await getDirAndFilesIn(path);

  return {
    directories: dirContents.filter(removeRegularFiles),
    files: dirContents.filter(removeDirectories),
  };
};

/**
 * Retrieve a Directory object.
 *
 * @param {string} path - The directory path.
 * @returns {Promise<Directory>} The directory data.
 */
const getDirectory = async (path: string): Promise<Directory> => {
  const commonData = await getCommonData(path);
  const content = await getDirContents(path);

  return {
    ...commonData,
    content,
    name: basename(path),
    type: 'directory',
  };
};

/**
 * Walk through a directory.
 *
 * @param {string} path - The directory path.
 * @returns {Promise<Directory>} The directory data.
 */
export const readDir = async (path: string): Promise<Directory> =>
  getDirectory(path);
