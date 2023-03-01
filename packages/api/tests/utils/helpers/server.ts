import { createServer, type Server } from 'http';
import type { Nullable } from '@cretadoc/utils';
import { createAPI } from '../../../src';
import { DEFAULT_ENDPOINT } from '../../../src/utils/constants';

type CreateAPIServerConfig = {
  endpoint?: string;
  hostname?: string;
  port?: number;
};

export const createAPIServer = ({
  endpoint = DEFAULT_ENDPOINT,
  hostname = 'localhost',
  port = 3100,
}: CreateAPIServerConfig) => {
  const api = createAPI({ endpoint });
  const server = createServer(() => api);
  let serverInstance: Nullable<Server> = null;

  const start = () => {
    serverInstance = server.listen(port, () => {
      console.log(`[api]: Server is running.`);
      console.log(
        `[api]: API is available at http://${hostname}:${port}${endpoint}`
      );
    });
  };

  const stop = () => {
    if (!serverInstance) {
      console.log('[server]: Server is not initialized. Cannot stop it.');
      return;
    }

    serverInstance.close((error) => {
      if (error) console.error(error);
      else console.log('[server]: Server is stopped.');
    });
  };

  return { instance: api, start, stop };
};
