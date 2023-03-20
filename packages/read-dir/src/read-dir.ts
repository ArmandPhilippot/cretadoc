import { readdir, readFile, stat } from 'fs/promises';
import { basename, join, parse } from 'path';
import { type Maybe, removeUndefined } from '@cretadoc/utils';
import type {
  Dates,
  Directory,
  DirectoryContents,
  Extension,
  ReadDirOptions,
  RegularFile,
} from './types';
import { mergeOptionsWithDefault } from './utils/helpers/config';
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
 * @param {Omit<Readonly<ReadDirOptions>, 'depth'>} options - The options.
 * @returns {Promise<Maybe<RegularFile>>} The file data.
 */
const getRegularFile = async (
  path: string,
  { extensions, includeFileContents }: Omit<Readonly<ReadDirOptions>, 'depth'>
): Promise<Maybe<RegularFile>> => {
  const commonData = await getCommonData(path);
  const { ext, name } = parse(path);
  const extension = ext as Extension;
  const isValidExtension = extensions ? extensions.includes(extension) : true;

  if (!isValidExtension) return undefined;

  const contents = includeFileContents
    ? await readFile(path, 'utf8')
    : undefined;

  return {
    ...commonData,
    contents,
    extension,
    name,
    type: 'file',
  };
};

/**
 * Retrieve an array of directories and regular files.
 *
 * @param {string} path - The directory path
 * @param {Readonly<ReadDirOptions>} options - The options
 * @returns {Promise<Array<Directory | RegularFile>>} The directories and files.
 */
const getDirAndFilesIn = async (
  path: string,
  options: Readonly<ReadDirOptions>
): Promise<Array<Directory | RegularFile>> => {
  const dirEntries = await readdir(path, {
    encoding: 'utf8',
    withFileTypes: true,
  });

  const promises = dirEntries.map(async (entry) => {
    const fullPath = join(path, entry.name);

    /* eslint-disable-next-line @typescript-eslint/no-use-before-define -- The
    circular reference is needed to avoid repeats. */
    if (entry.isDirectory()) return getDirectory(fullPath, options);
    if (entry.isFile()) return getRegularFile(fullPath, options);
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
 * @param {Readonly<ReadDirOptions>} options - The options.
 * @returns {Promise<Maybe<DirectoryContents>>} The directory contents.
 */
const getDirContents = async (
  path: string,
  { depth, ...options }: Readonly<ReadDirOptions>
): Promise<Maybe<DirectoryContents>> => {
  const depthLimit = 0;
  const dirContents =
    !depth || depth > depthLimit
      ? await getDirAndFilesIn(path, { depth, ...options })
      : undefined;

  if (!dirContents) return undefined;

  return {
    directories: dirContents.filter(removeRegularFiles),
    files: dirContents.filter(removeDirectories),
  };
};

/**
 * Retrieve a Directory object.
 *
 * @param {string} path - The directory path.
 * @param {Readonly<ReadDirOptions>} options - The options.
 * @returns {Promise<Directory>} The directory data.
 */
const getDirectory = async (
  path: string,
  { depth, ...options }: Readonly<ReadDirOptions>
): Promise<Directory> => {
  const commonData = await getCommonData(path);
  const depthCount = 1;
  const updatedDepth = depth === undefined ? undefined : depth - depthCount;
  const contents = await getDirContents(path, {
    depth: updatedDepth,
    ...options,
  });

  return {
    ...commonData,
    contents,
    name: basename(path),
    type: 'directory',
  };
};

/**
 * Walk through a directory.
 *
 * @param {string} path - The directory path.
 * @param {Partial<ReadDirOptions>} [options] - The options.
 * @returns {Promise<Directory>} The directory data.
 */
export const readDir = async (
  path: string,
  options?: Partial<ReadDirOptions>
): Promise<Directory> => {
  const mergedOptions = mergeOptionsWithDefault(options);

  return getDirectory(path, mergedOptions);
};
