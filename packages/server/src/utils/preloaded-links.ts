import type { Maybe } from '@cretadoc/utils';
import type { LinkAsValue, LinkAttributes } from '../types/internal';

/**
 * Check if the given file is a script.
 *
 * @param {string} file - A file path.
 * @returns {boolean} True if the file is a script.
 */
const isScript = (file: string): boolean => file.endsWith('.js');

/**
 * Check if the given file is a stylesheet.
 *
 * @param {string} file - A file path.
 * @returns {boolean} True if the file is a stylesheet.
 */
const isStylesheet = (file: string): boolean => file.endsWith('.css');

/**
 * Check if the given file is a font.
 *
 * @param {string} file - A file path.
 * @returns {boolean} True if the file is a font.
 */
const isFont = (file: string): boolean =>
  file.endsWith('.woff') || file.endsWith('.woff2');

/**
 * Retrieve the type of content from a file path.
 *
 * @param {string} file - The file path.
 * @returns {Maybe<LinkAsValue>} The type of content.
 */
const getLinkAs = (file: string): Maybe<LinkAsValue> => {
  if (isFont(file)) return 'font';
  if (isScript(file)) return 'script';
  if (isStylesheet(file)) return 'style';
  return undefined;
};

/**
 * Retrieve the link attributes from a file path.
 *
 * @param {string} file - The file path.
 * @returns {Maybe<LinkAttributes>} The link attributes.
 */
const getLinkAttributes = (file: string): Maybe<LinkAttributes> => {
  const linkAs = getLinkAs(file);

  return linkAs
    ? {
        as: linkAs,
        href: file,
        rel: 'preload',
      }
    : undefined;
};

/**
 * Create a HTML link element with the given attributes.
 *
 * @param {LinkAttributes} attrs - The link attributes.
 * @returns {string} A HTML link element.
 */
const createLinkElementFrom = (attrs: LinkAttributes): string => {
  let link = '<link ';

  for (const k of Object.keys(attrs)) {
    const key = k as keyof LinkAttributes;
    const value = attrs[key];
    if (value) link += `${key}="${value}" `;
  }

  link += '/>';

  return link;
};

/**
 * Create a HTML link element with `rel="preload"` attribute.
 *
 * @param {string} file - A file path.
 * @returns {Maybe<string>} The preloaded link.
 */
const createPreloadedLink = (file: string): Maybe<string> => {
  const attrs = getLinkAttributes(file);

  return attrs ? createLinkElementFrom(attrs) : '';
};

/**
 * Retrieve the HTML link elements from a list of files.
 *
 * @param {string[]} files - A list of file paths.
 * @returns {string} The HTML link elements.
 */
export const getPreloadLinkElements = (files: string[]): string =>
  files.map(createPreloadedLink).join('\n');
