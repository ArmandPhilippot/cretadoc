import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createServer } from './server';
import type { CretadocServer } from './types';
import { DEFAULT_CONFIG } from './utils/constants';

describe('create-server', () => {
  it('can create a new server', async () => {
    const server = await createServer();
    expectTypeOf(server).toMatchTypeOf<CretadocServer>();
  });

  it('returns an immutable config object', async () => {
    const app = await createServer();
    const renameHostname = () => {
      // @ts-expect-error -- ts(2540) we cannot reassign readonly property
      app.config.hostname = 'ullam';
    };

    const updatePort = () => {
      // @ts-expect-error -- ts(2540) we cannot reassign readonly property
      app.config.port = 500;
    };

    expect(app.config).toStrictEqual(DEFAULT_CONFIG);
    expect(renameHostname).toThrowError(/Cannot assign to read only property/i);
    expect(updatePort).toThrowError(/Cannot assign to read only property/i);
  });

  it('can start/stop the server', async () => {
    const server = await createServer();
    const start = vi.spyOn(server, 'start');
    const stop = vi.spyOn(server, 'stop');

    server.start();
    expect(start).toHaveBeenCalledOnce();

    server.stop();
    expect(stop).toHaveBeenCalledOnce();
  });
});
