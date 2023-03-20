import type { ServerReturn } from 'src/types';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createServer } from '../src';
import { getDefaultConfig } from '../src/utils/config';

describe('server', () => {
  const config = getDefaultConfig();

  it('returns a config object and two methods to start/stop the server', () => {
    const app = createServer();

    expectTypeOf(app).toMatchTypeOf<ServerReturn>();
  });

  it('returns an immutable config object', () => {
    const app = createServer();
    const renameHostname = () => {
      // @ts-expect-error -- ts(2540) we cannot reassign readonly property
      app.config.hostname = 'ullam';
    };

    const updatePort = () => {
      // @ts-expect-error -- ts(2540) we cannot reassign readonly property
      app.config.port = 500;
    };

    expect(app.config).toStrictEqual(config);
    expect(renameHostname).toThrowError(/Cannot assign to read only property/i);
    expect(updatePort).toThrowError(/Cannot assign to read only property/i);
  });

  it('accepts a custom hostname', () => {
    const hostname = 'animi';
    const app = createServer({ hostname });
    expect(app.config.hostname).toBe(hostname);
  });

  it('accepts a custom port', () => {
    const port = 8000;
    const app = createServer({ port });
    expect(app.config.port).toBe(port);
  });

  it('can start/stop the server', () => {
    const app = createServer();
    const startSpy = vi.spyOn(app, 'start');
    const stopSpy = vi.spyOn(app, 'stop');

    app.start();
    expect(startSpy).toHaveBeenCalled();

    app.stop();
    expect(stopSpy).toHaveBeenCalled();
  });
});
