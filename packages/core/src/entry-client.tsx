import { LinkProvider } from '@cretadoc/ui';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RouterLink } from './components';
import { createRoutes } from './routes';
import type { CretadocClientConfig } from './types/config';
import { DEFAULT_CLIENT_CONFIG } from './utils/constants';
import { ConfigProvider } from './utils/contexts';

type WindowWithInitialState = typeof window & {
  __INITIAL_STATE__?: string;
};

type InitialState = {
  config: CretadocClientConfig;
};

const serializedInitialState = (window as WindowWithInitialState)
  .__INITIAL_STATE__;
delete (window as WindowWithInitialState).__INITIAL_STATE__;

const initialState: InitialState = serializedInitialState
  ? (JSON.parse(serializedInitialState) as InitialState)
  : { config: DEFAULT_CLIENT_CONFIG };

const router = createBrowserRouter(createRoutes(initialState.config));

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <ConfigProvider config={initialState.config}>
      <IntlProvider locale={initialState.config.locale}>
        <LinkProvider value={RouterLink}>
          <RouterProvider router={router} />
        </LinkProvider>
      </IntlProvider>
    </ConfigProvider>
  </StrictMode>
);
