import type { APIInstance } from '@cretadoc/api';
import type { Maybe, ReadonlyDeep } from '@cretadoc/utils';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type { ViteDevServer } from 'vite';
import type { ENVIRONMENT } from '../utils/constants';

export type ServerMode = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export type HMRConfig =
  | false
  | {
      /**
       * The port used by Vite HMR (dev mode).
       */
      port: Maybe<number>;
    };

export type SSRConfig = {
  /**
   * A path to the server entrypoint.
   */
  entrypoint: string;
  /**
   * The route used for serve-side rendering.
   * @default '/'
   */
  route: string;
};

export type StaticDirConfig = {
  /**
   * The static directory entrypoint.
   * @default 'index.html'
   */
  entrypoint: string;
  /**
   * The static directory path.
   */
  path: string;
  /**
   * The route used to serve the static directory.
   * @default '/static'
   */
  route: string;
};

export type ServerConfig = {
  /**
   * An API instance.
   * @default undefined
   */
  api: Maybe<APIInstance>;
  /**
   * The HMR configuration when using dev mode.
   */
  hmr: Maybe<HMRConfig>;
  /**
   * The server hostname.
   * @default "localhost"
   */
  hostname: string;
  /**
   * The server mode.
   * @default "development"
   */
  mode: ServerMode;
  /**
   * The server port.
   * @default 3000
   */
  port: number;
  /**
   * The configuration to activate server-side rendering.
   * @default undefined
   */
  ssr: Maybe<SSRConfig>;
  /**
   * A configuration object to serve static files.
   * @default undefined
   */
  staticDir: Maybe<StaticDirConfig>;
};

export type CretadocServer = {
  /**
   * The server configuration.
   */
  config: ReadonlyDeep<ServerConfig>;
  /**
   * A method to start the server.
   */
  start: () => void;
  /**
   * A method to stop the server.
   */
  stop: () => void;
};

export type RenderContext = {
  /**
   * The HTTP request.
   */
  req: ExpressRequest;
  /**
   * The HTTP response sent by Express.
   */
  res: ExpressResponse;
  /**
   * The vite server, only used in development mode.
   */
  viteServer: Maybe<ViteDevServer>;
};

export type RenderFn = (ctx: RenderContext) => void | Promise<void>;
