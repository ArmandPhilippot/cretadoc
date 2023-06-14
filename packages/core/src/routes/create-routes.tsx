import { type RouteObject, redirect } from 'react-router-dom';
import { App } from '../app';
import { HomePage, NotFoundPage, RegularPage } from '../pages';
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
        path: ROUTES.HOMEPAGE,
        element: <HomePage />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '/:slug',
        element: <RegularPage />,
        loader: pageLoader,
      },
      {
        path: '*',
        loader: () => redirect(ROUTES.NOT_FOUND),
      },
    ],
  },
];
