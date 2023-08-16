import type { Slug } from '@cretadoc/api';
import { type PartialDeep, isObject } from '@cretadoc/utils';
import { docEntryMetaQuery, fetchAPI, pageMetaQuery } from '../../services';
import type {
  CommonMeta,
  CretadocClientConfig,
  PageOrEntryMeta,
  WebpageMeta,
} from '../../types';
import { getSlugInfoFrom, isSlug } from '../client';
import { ROUTES } from '../constants';

type SeoSuffixes = {
  pageNumberSuffix: string;
  siteNameSuffix: string;
};
type GetMetadataConfig = {
  baseUrl: string;
  fullUrl: string;
  seo: SeoSuffixes;
  site: Pick<CretadocClientConfig, 'doc' | 'locale' | 'name'>;
};

/**
 * Retrieve the default metadata.
 *
 * @param {string} url - The full url of the page.
 * @param {string} siteName - The site name.
 * @returns {PageOrEntryMeta} The default metadata
 */
const getDefaultMeta = (url: string, siteName: string): PageOrEntryMeta => {
  return {
    canonical: url,
    openGraph: {
      siteName,
      title: siteName,
      type: 'article',
      url,
    },
    robots: 'index, follow',
    title: siteName,
  };
};

/**
 * Retrieve the metadata of a documentation entry.
 *
 * @param {Slug} slug - The entry slug.
 * @param {GetMetadataConfig} config - The config.
 * @returns {Promise<PageOrEntryMeta>} The entry metadata.
 */
const getDocEntryMetadata = async (
  slug: Slug,
  { baseUrl, fullUrl, seo, site }: GetMetadataConfig
): Promise<PageOrEntryMeta> => {
  const entrySlug = slug.replace(site.doc.slug, '');
  // If entry slug is an empty str it should be doc root
  const isDocRoot = !isSlug(entrySlug);
  const response = await fetchAPI<typeof docEntryMetaQuery>(
    {
      query: docEntryMetaQuery,
      variables: { slug: isDocRoot ? '/' : entrySlug },
    },
    baseUrl
  );

  if (!response.data?.doc?.entry) return getDefaultMeta(fullUrl, site.name);

  const { pageNumberSuffix, siteNameSuffix } = seo;
  const docSuffix = isDocRoot ? '' : ` - ${site.doc.label}`;
  const { excerpt, name, meta } = response.data.doc.entry;
  const title = meta?.seoTitle ?? meta?.title ?? name;
  const description = meta?.seoDescription ?? excerpt ?? undefined;

  return {
    canonical: fullUrl,
    description,
    openGraph: {
      description,
      siteName: site.name,
      title,
      type: 'article',
      url: fullUrl,
    },
    robots: meta?.status === 'draft' ? 'noindex, nofollow' : 'index, follow',
    title: `${title}${pageNumberSuffix}${docSuffix}${siteNameSuffix}`,
  };
};

/**
 * Retrieve the metadata of a page.
 *
 * @param {string} nameOrSlug - The page name or slug.
 * @param {GetMetadataConfig} config - The config.
 * @returns {Promise<PageOrEntryMeta>} The metadata.
 */
const getPageMetadata = async (
  nameOrSlug: string,
  { baseUrl, fullUrl, seo, site }: GetMetadataConfig
): Promise<PageOrEntryMeta> => {
  const response = await fetchAPI<typeof pageMetaQuery>(
    {
      query: pageMetaQuery,
      variables: isSlug(nameOrSlug)
        ? { slug: nameOrSlug }
        : { name: nameOrSlug },
    },
    baseUrl
  );

  if (!response.data?.page) return getDefaultMeta(fullUrl, site.name);

  const { siteNameSuffix } = seo;
  const { excerpt, name, meta } = response.data.page;
  const title = meta?.seoTitle ?? meta?.title ?? name;
  const description = meta?.seoDescription ?? excerpt ?? undefined;

  return {
    canonical: fullUrl,
    description,
    openGraph: {
      description,
      siteName: site.name,
      title,
      type: 'article',
      url: fullUrl,
    },
    robots: meta?.status === 'draft' ? 'noindex, nofollow' : 'index, follow',
    title: `${title}${siteNameSuffix}`,
  };
};

/**
 * Retrieve the metadata of a page or a documentation entry.
 *
 * @param {string} url - The url.
 * @param {CretadocClientConfig} config - The config.
 * @returns {Promise<PageOrEntryMeta>} The metadata.
 */
const getMetadataOf = async (
  url: string,
  config: CretadocClientConfig
): Promise<PageOrEntryMeta> => {
  const { origin: baseUrl, pathname } = new URL(url);
  const { slug, pageNumber } = getSlugInfoFrom(pathname);
  const siteNameSuffix = ` - ${config.name}`;
  const pageNumberSuffix = pageNumber ? ` - Page ${pageNumber} ` : '';
  const pageOrEntryConfig = {
    baseUrl,
    fullUrl: url,
    seo: {
      pageNumberSuffix,
      siteNameSuffix,
    },
    site: config,
  };

  if (slug.startsWith(config.doc.slug))
    return getDocEntryMetadata(slug, pageOrEntryConfig);

  return getPageMetadata(
    slug === ROUTES.HOMEPAGE ? config.pages.homepage : slug,
    pageOrEntryConfig
  );
};

/**
 * Load the metadata for the given url.
 *
 * @param {string} url - The url.
 * @param {CretadocClientConfig} config - The site config.
 * @returns {Promise<PartialDeep<WebpageMeta>>} The metadata.
 */
export const loadMetadata = async (
  url: string,
  config: CretadocClientConfig
): Promise<PartialDeep<WebpageMeta>> => {
  const commonMeta: CommonMeta = {
    applicationName: config.name,
    charset: 'utf-8',
    colorScheme: isObject(config.theme) ? 'light dark' : 'normal',
    favicon: {
      slug: '/vite.svg',
      type: 'image/svg+xml',
    },
    viewport: 'width=device-width, initial-scale=1',
  };
  const urlMeta = await getMetadataOf(url, config);

  return {
    ...commonMeta,
    ...urlMeta,
  };
};
