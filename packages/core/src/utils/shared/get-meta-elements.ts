import {
  camelCaseToHyphenated,
  camelToSnakeCase,
  type Nullable,
  type NullableOptionalKeysOf,
  type PartialDeep,
  type ReplaceTypesIn,
} from '@cretadoc/utils';
import { createElement } from 'react';
import type { OpenGraphMeta, WebpageMeta } from '../../types';

type OpenGraphElements = NullableOptionalKeysOf<
  ReplaceTypesIn<Partial<OpenGraphMeta>, React.JSX.Element>
>;

type HeadElements = NullableOptionalKeysOf<
  ReplaceTypesIn<
    Partial<Omit<WebpageMeta, 'favicon' | 'openGraph'>>,
    React.JSX.Element
  >
> & {
  favicon: Nullable<React.JSX.Element[]>;
  openGraph: OpenGraphElements;
};

const OG_DEFAULT_ELEMENTS: OpenGraphElements = {
  description: null,
  siteName: null,
  title: null,
  type: null,
  url: null,
};

const HEAD_DEFAULT_ELEMENTS: HeadElements = {
  applicationName: null,
  canonical: null,
  charset: null,
  colorScheme: null,
  description: null,
  favicon: null,
  openGraph: OG_DEFAULT_ELEMENTS,
  robots: null,
  title: null,
  viewport: null,
};

/**
 * Retrieve the link elements used to display the favicon.
 *
 * @param {PartialDeep<WebpageMeta>['favicon']} favicon - The favicon data.
 * @returns {React.JSX.Element[]} The favicon element(s).
 */
const getFaviconElements = (
  favicon: PartialDeep<WebpageMeta>['favicon']
): React.JSX.Element[] => {
  if (!favicon) return [];

  if (Array.isArray(favicon))
    return favicon.map((icon) => {
      const key = `favicon-${icon.size}`;

      return createElement('link', {
        href: icon.slug,
        key,
        rel: 'icon',
        sizes: icon.size,
        type: icon.type,
      });
    });

  return favicon.slug
    ? [
        createElement('link', {
          href: favicon.slug,
          key: 'favicon',
          rel: 'icon',
          type: favicon.type,
        }),
      ]
    : [];
};

/**
 * Reorder the OpenGraph elements.
 *
 * @param {OpenGraphElements} elements - The OpenGraph elements.
 * @returns {OpenGraphElements} The reordered open graph elements.
 */
const reorderOpenGraphElements = (
  elements: OpenGraphElements
): OpenGraphElements => {
  const { description, title, type, url, ...meta } = elements;

  return {
    url,
    type,
    title,
    description,
    ...meta,
  };
};

/**
 * Retrieve the meta elements used to display the open graph metadata.
 *
 * @param {PartialDeep<WebpageMeta>['openGraph']} openGraph - OpenGraph data.
 * @returns {OpenGraphElements} The open graph elements.
 */
const getOpenGraphElements = (
  openGraph: PartialDeep<WebpageMeta>['openGraph']
): OpenGraphElements => {
  const elements = reorderOpenGraphElements(OG_DEFAULT_ELEMENTS);

  if (!openGraph) return elements;

  const keys = Object.keys(openGraph) as Array<
    Extract<keyof OpenGraphMeta, string>
  >;

  for (const key of keys)
    if (openGraph[key]) {
      const property = `og:${camelToSnakeCase(key)}`;

      elements[key] = createElement('meta', {
        content: openGraph[key],
        key: property,
        property,
      });
    }

  return elements;
};

/**
 * Reorder the document head elements.
 *
 * @param {HeadElements} elements - The head elements.
 * @returns {HeadElements} The reordered head elements.
 */
const reorderHeadElements = (elements: HeadElements): HeadElements => {
  const { charset, description, robots, title, viewport, ...meta } = elements;

  return {
    charset,
    viewport,
    title,
    description,
    robots,
    ...meta,
  };
};

/**
 * Retrieve the meta elements from a metadata object.
 *
 * @param {PartialDeep<WebpageMeta>} metadata - The metadata object.
 * @returns {HeadElements} The document head elements.
 */
const getMetaElementsFrom = (
  metadata: PartialDeep<WebpageMeta>
): HeadElements => {
  const keys = Object.keys(metadata) as Array<keyof WebpageMeta>;
  const elements = reorderHeadElements(HEAD_DEFAULT_ELEMENTS);

  for (const key of keys) {
    if (!metadata[key]) continue;

    switch (key) {
      case 'applicationName':
      case 'colorScheme':
      case 'description':
      case 'robots':
      case 'viewport':
        elements[key] = createElement('meta', {
          content: metadata[key],
          key,
          name: camelCaseToHyphenated(key),
        });
        break;
      case 'canonical':
        elements[key] = createElement('link', {
          href: metadata[key],
          key,
          rel: key,
        });
        break;
      case 'charset':
        elements[key] = createElement('meta', { charSet: metadata[key], key });
        break;
      case 'favicon':
        elements[key] = getFaviconElements(metadata[key]);
        break;
      case 'openGraph':
        elements[key] = getOpenGraphElements(metadata[key]);
        break;
      case 'title':
        elements[key] = createElement('title', { key }, metadata[key]);
        break;
      default:
        break;
    }
  }

  return elements;
};

/**
 * Retrieve the meta elements from a meta object.
 *
 * @param {PartialDeep<WebpageMeta>} meta - The meta object.
 * @returns {Array<Nullable<React.JSX.Element>>} The meta elements.
 */
export const getMetaElements = (
  meta: PartialDeep<WebpageMeta>
): Array<Nullable<React.JSX.Element>> => {
  const { favicon, openGraph, ...tags } = getMetaElementsFrom(meta);
  const metaTags = Object.values(tags);
  const openGraphTags = Object.values(openGraph);

  return [
    ...metaTags,
    ...(Array.isArray(favicon) ? favicon : [favicon]),
    ...openGraphTags,
  ];
};
