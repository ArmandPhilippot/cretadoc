import type { RouteObject } from 'react-router-dom';
import { App } from '../app';
import { ErrorPage, HomePage, RegularPage } from '../pages';
import type { CretadocClientConfig } from '../types';
import { ROUTES } from '../utils/constants';
import { pageLoader } from './loaders';

/**
 * Create the application routes.
 *
 * @param {CretadocClientConfig} config - The client configuration.
 * @returns {RouteObject[]} The routes.
 */
export const createRoutes = ({
  name,
  theme,
}: CretadocClientConfig): RouteObject[] => [
  {
    element: <App name={name} theme={theme} />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: ROUTES.HOMEPAGE,
            element: <HomePage />,
          },
          {
            path: '/:slug',
            element: <RegularPage />,
            loader: pageLoader,
          },
        ],
      },
    ],
  },
];
