import { redirect, type RouteObject } from 'react-router-dom';
import { App } from '../app';
import {
  DocEntryPage,
  DocIndexPage,
  DocPage,
  ErrorPage,
  RegularPage,
} from '../pages';
import type { CretadocClientConfig } from '../types';
import { PAGINATED_SLUG_PREFIX, ROUTES } from '../utils/constants';
import { getBreadcrumbItem } from './handlers';
import { docEntriesLoader, docEntryLoader, pagesLoader } from './loaders';

const handle = {
  getBreadcrumbItem,
};

/**
 * Create the application routes.
 *
 * @param {CretadocClientConfig} config - The client configuration.
 * @returns {RouteObject[]} The routes.
 */
export const createRoutes = ({
  name,
  pages,
  theme,
}: CretadocClientConfig): RouteObject[] => [
  {
    element: <App name={name} theme={theme} />,
    handle,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: ROUTES.HOMEPAGE,
            element: <RegularPage />,
            loader: async (args) => pagesLoader({ ...args, pages }),
          },
          {
            path: ROUTES.DOC,
            element: <DocPage />,
            handle,
            children: [
              {
                element: <DocIndexPage />,
                loader: docEntriesLoader,
                index: true,
              },
              {
                path: `${ROUTES.DOC}${PAGINATED_SLUG_PREFIX}/1`,
                loader: () => redirect(ROUTES.DOC),
              },
              {
                path: `${ROUTES.DOC}${PAGINATED_SLUG_PREFIX}/:page`,
                element: <DocIndexPage />,
                loader: docEntriesLoader,
                handle,
              },
              {
                path: `${ROUTES.DOC}/*`,
                element: <DocEntryPage />,
                loader: docEntryLoader,
                handle,
              },
            ],
          },
          {
            path: '/:slug',
            element: <RegularPage />,
            loader: async (args) => pagesLoader({ ...args, pages }),
            handle,
          },
        ],
      },
    ],
  },
];
