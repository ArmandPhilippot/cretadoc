import type { Edge, Page } from '@cretadoc/api';
import { slugify } from '@cretadoc/utils';
import type { PageWithSlug } from '../../types';

/**
 * Retrieve all the pages with an extra slug property.
 *
 * @param {Array<Edge<Page>>} edges - The pages edges.
 * @returns {PageWithSlug} The pages with a slug prop.
 */
export const getPagesWithSlug = (edges: Array<Edge<Page>>): PageWithSlug[] =>
  edges.map((page) => {
    return {
      ...page.node,
      slug: `/${slugify(page.node.name)}`,
    };
  });
