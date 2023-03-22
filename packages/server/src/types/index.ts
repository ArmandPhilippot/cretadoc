import type { APIInstance } from '@cretadoc/api';
import type { Maybe, ReadonlyDeep } from '@cretadoc/utils';
import type { ENVIRONMENT } from 'src/utils/constants';

export type ServerMode = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export type APIConfig = {
  /**
   * An API instance.
   */
  instance: APIInstance;
  /**
   * The route used to serve the API.
   * @default '/api'
   */
  route: string;
};

export type HMRConfig = {
  /**
   * The port used by Vite HMR (dev mode).
   */
  port: Maybe<number>;
};

export type SSRPlaceholders = {
  /**
   * The placeholder for main content.
   */
  content: string;
  /**
   * The placeholder for state shared between server & client.
   */
  initialState: Maybe<string>;
};

export type SSRConfig = {
  /**
   * A path to the server entrypoint.
   */
  entrypoint: string;
  /**
   * The HTML template placeholders.
   */
  placeholders: SSRPlaceholders;
  /**
   * The route used for serve-side rendering.
   * @default '/'
   */
  route: string;
  /**
   * The path to a HTML file to use as template.
   */
  template: string;
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
   * A configuration object to serve an API instance.
   * @default undefined
   */
  api: Maybe<APIConfig>;
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

export type ServerReturn = {
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

export type Render = {
  initialState?: Record<string, unknown>;
  html: string;
};

export type ServerRender = (url: string) => Promise<Render>;
