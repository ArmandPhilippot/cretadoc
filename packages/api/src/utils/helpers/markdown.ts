import { resolve } from 'node:path';
import { isString, type Maybe } from '@cretadoc/utils';
import type { ErrorDetails, Meta } from '../../types';
import { EXCERPT_SEPARATOR, MARKDOWN_EXTENSION } from '../constants';
import { CretadocAPIError } from '../exceptions';
import { isAbsoluteUrl } from './paths';
import { getSlugFrom } from './strings';
import { validateMetaKeyValue } from './validators';

/**
 * Transform a markdown file path to a slug.
 *
 * @param {string} baseUrl - The base url.
 * @param {string} path - The relative file path.
 * @returns {string} The file link.
 */
const getFileLink = (baseUrl: string, path: string): string => {
  const resolvedPath = resolve(baseUrl, path);

  return getSlugFrom(
    resolvedPath.replace(new RegExp(`${MARKDOWN_EXTENSION}$`), '')
  );
};

/**
 * Transform the relative paths in content using the base url.
 *
 * @param {string} content - The markdown content.
 * @param {string} baseUrl - The base url for assets and links.
 * @returns {string} The transformed content.
 */
const replaceRelativePaths = (content: string, baseUrl: string): string => {
  const linksRegex = /\[(?:.*?)\]\((?<links>.+?)(?:\))/g;

  return content.replace(linksRegex, (match, link, _args) => {
    if (!isString(link) || isAbsoluteUrl(link)) return match;

    const base = link.endsWith(MARKDOWN_EXTENSION)
      ? getFileLink(baseUrl, link)
      : resolve(baseUrl, link);

    return match.replace(link, base);
  });
};

/**
 * Create a RegExp to obtain two groups (content + rawMeta) from a MD string.
 *
 * @returns {RegExp} The regex to parse a markdown string.
 */
const createMarkdownContentsRegex = (): RegExp => {
  const yamlDelimiter = '-{3}';
  const newlines = '\r\n|\n|\r';
  const rawMetaGroup = `(?<rawMeta>(?:.+(?:${newlines})){0,})`;
  const frontMatter = `(?:(?:${yamlDelimiter}\n)${rawMetaGroup}(?:${yamlDelimiter})(?:${newlines}){0,})`;
  const excerptGroup = `(?:(?<excerpt>(?:.|${newlines})+)(?:${EXCERPT_SEPARATOR}))`;
  const contentGroup = `(?<content>(?:.|${newlines})*)`;

  return new RegExp(`${frontMatter}?${excerptGroup}?${contentGroup}?`, 'g');
};

type MarkdownGroups = {
  content?: string;
  excerpt?: string;
  rawMeta?: string;
};

/**
 * Retrieve the Markdown parts from a string.
 *
 * @param {string} content - A Markdown string to parse.
 * @returns {Maybe<MarkdownGroups>} Maybe the content and the raw meta.
 */
export const getMarkdownGroups = (content: string): Maybe<MarkdownGroups> => {
  const regex = createMarkdownContentsRegex();
  const markdown = regex.exec(content);

  return markdown?.groups;
};

/**
 * Convert a string to a Meta object.
 *
 * @param {string} meta - A raw string representing the meta.
 * @returns {Meta} An object.
 */
const getFrontMatterMeta = (meta: string): Record<string, string> => {
  const newlines = '\r\n|\n|\r';
  const keyValueDelimiter = ': ';
  const metaEntries = meta
    .replace(new RegExp(`(?:${newlines})$`), '')
    .split(new RegExp(`(?:${newlines})`))
    .map((entry) => entry.split(keyValueDelimiter) as [string, string]);

  return Object.fromEntries(metaEntries);
};

/**
 * Check if the given key is in the valid meta keys.
 *
 * @param {string} key - A key to validate.
 * @param {Array<keyof Meta>} validKeys - The valid keys.
 * @returns {boolean} True if the key is valid.
 */
const isValidMetaKey = (
  key: string,
  validKeys: Array<keyof Meta>
): key is keyof Meta => (validKeys as string[]).includes(key);

/**
 * Retrieve the validation errors for a Meta key/value pair.
 *
 * @param {keyof Meta} key - A key to validate.
 * @param {string} value - A value to validate.
 * @returns {Array<ErrorDetails<Meta>>} The validation errors.
 */
const getValidationErrors = (
  key: keyof Meta,
  value: string
): Array<ErrorDetails<Meta>> => {
  const validationErrors = validateMetaKeyValue(key, value);

  if (validationErrors.length)
    return validationErrors.map((reason): ErrorDetails<Meta> => {
      return {
        errorKind: 'syntax',
        key,
        reason,
        received: value,
      };
    });

  return [];
};

/**
 * Check if the given object is a valid Meta object.
 *
 * @param {Record<string, string>} meta - An object.
 * @param {Array<keyof Meta>} validKeys - The valid meta keys.
 * @returns {Array<ErrorDetails<Meta>>} The validation errors.
 */
const validateMeta = (
  meta: Record<string, string>,
  validKeys: Array<keyof Meta>
): Array<ErrorDetails<Meta>> => {
  const errors: Array<ErrorDetails<Meta>> = [];

  for (const key of Object.keys(meta))
    if (isValidMetaKey(key, validKeys))
      errors.push(...getValidationErrors(key, meta[key] ?? ''));
    else
      errors.push({
        errorKind: 'syntax',
        reason: 'Received an unsupported meta key',
        received: key,
      });

  return errors;
};

/**
 * Check if the given meta object is valid.
 *
 * @param {Record<string, string>} _meta - The meta to validate.
 * @param {ErrorDetails[]} errors - An array of errors.
 * @returns {boolean} True the meta are valid
 */
const isValidMeta = (
  _meta: Record<string, string>,
  errors: Array<ErrorDetails<Meta>>
): _meta is Meta => !errors.length;

/**
 * Convert a string to a Meta object.
 *
 * @param {string} rawMeta - The meta as string.
 * @returns {Meta} The meta as object.
 */
const getMetaFrom = (rawMeta: string): Meta => {
  const metaObj = getFrontMatterMeta(rawMeta);
  const validKeys: Array<keyof Meta> = [
    'createdAt',
    'seoDescription',
    'seoTitle',
    'status',
    'title',
    'updatedAt',
  ];
  const errors = validateMeta(metaObj, validKeys);

  if (isValidMeta(metaObj, errors)) return metaObj;

  throw new CretadocAPIError('Invalid meta', errors);
};

export type MarkdownData = {
  contents: string;
  excerpt?: string;
  meta?: Meta;
};

/**
 * Retrieve the content and maybe some meta from a Markdown string.
 *
 * @param {string} content - A Markdown string.
 * @param {string} basePath - The base path for assets and links.
 * @returns {MarkdownData} The markdown parts.
 */
export const parseMarkdown = (
  content: string,
  basePath: string
): MarkdownData => {
  const contentWithCorrectPaths = replaceRelativePaths(content, basePath);
  const data = getMarkdownGroups(contentWithCorrectPaths);

  return {
    contents: data?.content ?? '',
    excerpt: data?.excerpt,
    meta: data?.rawMeta ? getMetaFrom(data.rawMeta) : undefined,
  };
};

/**
 * Convert a Meta object to a string
 *
 * @param {Meta} meta - A Meta object.
 * @returns {string} The meta as string
 */
export const convertMetaToStr = (meta: Meta): string =>
  Object.entries(meta)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

/**
 * Convert a Meta object to front matter format.
 *
 * @param {Meta} meta - A Meta object
 * @returns {string} The front matter string.
 */
export const convertMetaToFrontMatter = (meta: Meta): string => {
  const metaStr = convertMetaToStr(meta);

  return `---\n${metaStr}\n---\n\n`;
};
