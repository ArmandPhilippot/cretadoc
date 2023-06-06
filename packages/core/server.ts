import { createCretadocApp } from './src';
import { ROOT_CONFIG_PATH } from './tests/utils/constants';
import { createConfigFile, removeConfigFile } from './tests/utils/helpers';

await createConfigFile(ROOT_CONFIG_PATH, 'custom', {
  name: 'Cretadoc',
  locale: 'en',
  paths: {
    pages: new URL('./tests/fixtures/pages/', import.meta.url).pathname,
  },
});
await createCretadocApp()
  .then((app) => {
    app.start();

    [
      'beforeExit',
      'uncaughtException',
      'unhandledRejection',
      'SIGHUP',
      'SIGINT',
      'SIGQUIT',
      'SIGILL',
      'SIGTRAP',
      'SIGABRT',
      'SIGBUS',
      'SIGFPE',
      'SIGUSR1',
      'SIGSEGV',
      'SIGUSR2',
      'SIGTERM',
    ].forEach((evt) => {
      process.on(evt, () => {
        void (async () => {
          await removeConfigFile(ROOT_CONFIG_PATH);
          process.exit();
        })();
      });
    });
  })
  .catch(async (err) => {
    if (err instanceof Error) await removeConfigFile(ROOT_CONFIG_PATH);
  });
