import { describe, expect, it } from 'vitest';
import { createServer } from '../src';

describe('hmr', () => {
  it('accepts a custom HMR port', async () => {
    const hmrPort = 4698;
    const server = await createServer({
      hmr: {
        port: hmrPort,
      },
    });

    expect(server.config.hmr).not.toBe(false);
    if (server.config.hmr) expect(server.config.hmr.port).toBe(hmrPort);
    expect.assertions(2);
  });

  it('disable HMR by default on production mode', async () => {
    const mode = 'production';

    const server = await createServer({
      mode,
    });

    expect(server.config.mode).toBe(mode);
    expect(server.config.hmr).toBe(false);
    expect.assertions(2);
  });
});
