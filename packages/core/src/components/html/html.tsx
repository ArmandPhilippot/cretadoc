import type { PartialDeep } from '@cretadoc/utils';
import type { FC, ReactNode } from 'react';
import type { CretadocClientConfig, WebpageMeta } from '../../types';
import { CRETADOC_ROOT } from '../../utils/constants';
import { getMetaElements } from '../../utils/shared';

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
   * The page metadata.
   */
  meta: PartialDeep<WebpageMeta>;
  /**
   * The URL object.
   */
  url: URL;
};

/* eslint-disable react/jsx-no-literals */
export const Html: FC<HtmlProps> = ({ children, config, meta, url }) => {
  const initialState = `window.__CRETADOC_DATA__='${JSON.stringify({
    config,
  })}'`;
  const viteIntegration = `
  import RefreshRuntime from '${url.origin}/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
`;
  const metaTags = getMetaElements(meta);

  return (
    <html lang={config.locale}>
      <head>
        {metaTags}
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
