import type { Maybe, ReadonlyDeep } from '@cretadoc/utils';
import type { ENVIRONMENT } from 'src/utils/constants';

export type ServerMode = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

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
   * The route used to serve static directory.
   * @default '/'
   */
  route: string;
};

export type ServerConfig = {
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
