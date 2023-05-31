import type { Render } from '@cretadoc/server';
import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './app/app';
import { ConfigProvider } from './utils/contexts';
import { loadConfig } from './utils/helpers/server';

export const render = async (url: string): Promise<Render> => {
  const config = await loadConfig();
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
