import type { Slug } from '@cretadoc/api';
import { PAGINATION_REGEX, ROUTES } from '../constants';
import { isPaginated } from './is-paginated';
import { isSlug } from './is-slug';
import { removeTrailingSlashes } from './remove-trailing-slashes';

type SlugInfo = {
  pageNumber?: number;
  slug: Slug;
};

/**
 * Retrieve the slug and maybe a page number from the given splat.
 *
 * @param {string} splat - The splat from React Router.
 * @returns {SlugInfo} The slug info.
 */
export const getSlugInfoFrom = (splat: string): SlugInfo => {
  const slug = isSlug(splat) ? splat : `/${splat}`;

  if (!isPaginated(slug))
    return {
      slug:
        slug === ROUTES.HOMEPAGE ? slug : (removeTrailingSlashes(slug) as Slug),
    };

  const trailingSlashIndex = slug.lastIndexOf('/');
  const pageNumber = Number(slug.slice(trailingSlashIndex + 1));

  return {
    pageNumber,
    slug: removeTrailingSlashes(slug.replace(PAGINATION_REGEX, '')) as Slug,
  };
};
