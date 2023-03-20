import type { ReadonlyDeep } from '@cretadoc/utils';
import type { ENVIRONMENT } from 'src/utils/constants';

export type ServerMode = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

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
