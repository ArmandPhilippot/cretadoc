import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { createRoutes } from './routes';
import type { CretadocClientConfig } from './types/config';
import { CRETADOC_ROOT, DEFAULT_CLIENT_CONFIG } from './utils/constants';

type WindowWithInitialState = typeof window & {
  __CRETADOC_DATA__?: string;
};

type InitialState = {
  config: CretadocClientConfig;
};

const serializedInitialState = (window as WindowWithInitialState)
  .__CRETADOC_DATA__;

delete (window as WindowWithInitialState).__CRETADOC_DATA__;

const initialState: InitialState = serializedInitialState
  ? (JSON.parse(serializedInitialState) as InitialState)
  : { config: DEFAULT_CLIENT_CONFIG };

const router = createBrowserRouter(createRoutes(initialState.config));

hydrateRoot(
  document.getElementById(CRETADOC_ROOT) as HTMLElement,
  <StrictMode>
    <App
      config={initialState.config}
      router={<RouterProvider router={router} />}
    />
  </StrictMode>
);
