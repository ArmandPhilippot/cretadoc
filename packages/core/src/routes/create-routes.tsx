import type { RouteObject } from 'react-router-dom';
import { App } from '../app';
import { ErrorPage, RegularPage } from '../pages';
import type { CretadocClientConfig } from '../types';
import { ROUTES } from '../utils/constants';
import { getBreadcrumbItem } from './handlers';
import { pagesLoader } from './loaders';

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
