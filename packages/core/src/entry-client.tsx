import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import type { CretadocConfig } from './types/config';
import { DEFAULT_CONFIG } from './utils/constants';
import { ConfigProvider } from './utils/contexts';

type WindowWithInitialState = typeof window & {
  __INITIAL_STATE__?: string;
};

type InitialState = {
  config: CretadocConfig;
};

const serializedInitialState = (window as WindowWithInitialState)
  .__INITIAL_STATE__;
delete (window as WindowWithInitialState).__INITIAL_STATE__;

const initialState: InitialState = serializedInitialState
  ? (JSON.parse(serializedInitialState) as InitialState)
  : { config: DEFAULT_CONFIG };

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <ConfigProvider config={initialState.config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
