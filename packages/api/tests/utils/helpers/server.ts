import { createServer, type Server } from 'http';
import type { Nullable } from '@cretadoc/utils';
import { type APIConfig, createAPI } from '../../../src';

type CreateAPIServerConfig = Pick<Partial<APIConfig>, 'data' | 'endpoint'> & {
  hostname?: string;
  port?: number;
};

export const createAPIServer = async ({
  data,
  endpoint,
  hostname = 'localhost',
  port = 3100,
}: CreateAPIServerConfig) => {
  const api = await createAPI({ data, endpoint });
  const server = createServer((req, res) => {
    void (async () => {
      await api(req, res);
    })();
  });
  let serverInstance: Nullable<Server> = null;

  const start = () => {
    serverInstance = server.listen(port, () => {
      console.log(`[api]: Server is running.`);
      console.log(
        `[api]: API is available at http://${hostname}:${port}${api.graphqlEndpoint}`
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
