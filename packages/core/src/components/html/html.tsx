import type { FC, ReactNode } from 'react';
import type { CretadocClientConfig } from '../../types';
import { CRETADOC_ROOT } from '../../utils/constants';

export type HtmlProps = {
  /**
   * The body.
   */
  children: ReactNode;
  /**
   * The client configuration.
   */
  config: CretadocClientConfig;
  /**
   * The url origin.
   */
  urlOrigin: string;
};

/* eslint-disable react/jsx-no-literals */
export const Html: FC<HtmlProps> = ({ children, config, urlOrigin }) => {
  const initialState = `window.__CRETADOC_DATA__='${JSON.stringify({
    config,
  })}'`;
  const viteIntegration = `
  import RefreshRuntime from '${urlOrigin}/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
`;

  return (
    <html lang={config.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Vite + React + TS</title>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        {import.meta.env.DEV ? (
          <>
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: viteIntegration }}
              type="module"
            />
            <script src="/@vite/client" type="module" />
          </>
        ) : null}
      </head>
      <body>
        <div id={CRETADOC_ROOT}>{children}</div>
        <script type="module" src="/src/entry-client.tsx" />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
      </body>
    </html>
  );
};
/* eslint-enable react/jsx-no-literals */
