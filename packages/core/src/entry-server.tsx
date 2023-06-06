import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Render } from '@cretadoc/server';
import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './app/app';
import { loadClientConfig } from './utils/client';
import { CONFIG_FILE_NAME } from './utils/constants';
import { ConfigProvider } from './utils/contexts';

export const render = async (url: string): Promise<Render> => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const config = await loadClientConfig(CONFIG_FILE_NAME, currentDir);
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <ConfigProvider config={config}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ConfigProvider>
    </StrictMode>
  );

  return {
    html,
    initialState: { config },
  };
};
