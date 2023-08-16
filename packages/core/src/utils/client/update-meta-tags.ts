import {
  type Maybe,
  type PartialDeep,
  isString,
  camelToSnakeCase,
} from '@cretadoc/utils';
import type { LinkHTMLAttributes, MetaHTMLAttributes } from 'react';
import type { OpenGraphMeta, PageOrEntryMeta } from '../../types';

type HeadTagName = 'link' | 'meta';

type HeadTagAttributes<T extends HeadTagName> = T extends 'link'
  ? LinkHTMLAttributes<HTMLLinkElement>
  : MetaHTMLAttributes<HTMLMetaElement>;

/**
 * Add a new tag in document head.
 *
 * @param {T} name - The tag name.
 * @param {HeadTagAttributes<T>} attrs - The tag attributes.
 */
const addTagToHead = <T extends HeadTagName>(
  name: T,
  attrs: HeadTagAttributes<T>
) => {
  const el = document.createElement(name);
  const keys = Object.keys(attrs) as Array<
    Extract<keyof HeadTagAttributes<T>, string>
  >;

  for (const key of keys) {
    const value = attrs[key];
    if (isString(value)) el.setAttribute(key, value);
  }

  document.head.appendChild(el);
};

/**
 * Update the content attribute of a meta tag in document head.
 *
 * @param {'name' | 'property'} kind - The meta kind.
 * @param {string} nameOrProperty - The name or property.
 * @param {Maybe<string>} content - The content to update.
 */
const updateMetaContent = (
  kind: 'name' | 'property',
  nameOrProperty: string,
  content: Maybe<string>
) => {
  if (!content) return;

  const el = document.querySelector(`meta[${kind}='${nameOrProperty}']`);

  if (el) el.setAttribute(`content`, content);
  else addTagToHead('meta', { [kind]: nameOrProperty, content });
};

/**
 * Update the open graph meta in document head.
 *
 * @param {PartialDeep<PageOrEntryMeta>['openGraph']} metadata - OpenGraph meta.
 */
const updateOpenGraphMetaTags = (
  metadata: PartialDeep<PageOrEntryMeta>['openGraph']
) => {
  if (!metadata) return;

  const keys = Object.keys(metadata) as Array<keyof OpenGraphMeta>;

  for (const key of keys)
    updateMetaContent('property', `og:${camelToSnakeCase(key)}`, metadata[key]);
};

/**
 * Update a `<meta name="" content="" />` in document head.
 *
 * @param {K} key - The meta name.
 * @param {V} value - The meta content.
 */
const updateMetaNameTag = <
  K extends keyof PageOrEntryMeta,
  V = PartialDeep<PageOrEntryMeta>[K]
>(
  key: K,
  value: V
) => {
  const validKeys = [
    'canonical',
    'description',
    'openGraph',
    'robots',
    'title',
  ] satisfies Array<keyof PageOrEntryMeta>;

  if (!(validKeys as string[]).includes(key) || !value) return;

  if (key === 'openGraph') updateOpenGraphMetaTags(value);
  else if (isString(value)) updateMetaContent('name', key, value);
};

/**
 * Update the canonical link in document head.
 *
 * @param {PartialDeep<PageOrEntryMeta>['canonical']} value - The link href.
 */
const updateLinkCanonical = (
  value: PartialDeep<PageOrEntryMeta>['canonical']
) => {
  if (!value) return;

  const el = document.querySelector("link[rel='canonical']");

  if (el) el.setAttribute('href', value);
  else addTagToHead('link', { href: value, rel: 'canonical' });
};

/**
 * Update the document title.
 *
 * @param {PartialDeep<PageOrEntryMeta>['title']} title - The title
 */
const updateTitle = (title: PartialDeep<PageOrEntryMeta>['title']) => {
  if (!title || document.title === title) return;

  document.title = title;
};

/**
 * Update the document head meta tags using the given metadata.
 *
 * @param {PartialDeep<PageOrEntryMeta>} metadata - A metadata object.
 */
export const updateMetaTags = (metadata: PartialDeep<PageOrEntryMeta>) => {
  const keys = Object.keys(metadata) as Array<keyof PageOrEntryMeta>;

  for (const key of keys)
    switch (key) {
      case 'canonical':
        updateLinkCanonical(metadata[key]);
        break;
      case 'description':
      case 'robots':
        updateMetaNameTag(key, metadata[key]);
        break;
      case 'openGraph':
        updateOpenGraphMetaTags(metadata[key]);
        break;
      case 'title':
        updateTitle(metadata[key]);
        break;
      default:
        break;
    }
};
