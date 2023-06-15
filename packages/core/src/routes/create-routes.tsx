import type { BreadcrumbsItem } from '@cretadoc/ui';
import type { RouteObject } from 'react-router-dom';
import { App } from '../app';
import { ErrorPage, RegularPage } from '../pages';
import type { CretadocClientConfig } from '../types';
import { ROUTES } from '../utils/constants';
import { pagesHandler, pagesLoader } from './pages';

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
    handle: {
      getBreadcrumbItem: (): BreadcrumbsItem => {
        return {
          id: 'homepage',
          label: 'Home',
          url: ROUTES.HOMEPAGE,
        };
      },
    },
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
            path: '/:slug',
            element: <RegularPage />,
            loader: async (args) => pagesLoader({ ...args, pages }),
            handle: pagesHandler,
          },
        ],
      },
    ],
  },
];
