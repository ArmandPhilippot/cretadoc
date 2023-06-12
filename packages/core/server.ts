import { createCretadocApp } from './src';
import {
  PAGES_FIXTURES_DIR_PATH,
  ROOT_CONFIG_PATH,
} from './tests/utils/constants';
import {
  type Fixture,
  createConfigFile,
  createFixtures,
  deleteFixtures,
  removeConfigFile,
} from './tests/utils/helpers';

const fixtures: Fixture[] = [
  { name: 'homepage', contents: '# Home\n\nWelcome to Cretadoc homepage!' },
  { name: 'about', contents: '# About' },
];

await createConfigFile(ROOT_CONFIG_PATH, 'custom', {
  name: 'Cretadoc',
  locale: 'en',
  paths: {
    pages: PAGES_FIXTURES_DIR_PATH,
  },
});

await createFixtures(fixtures);

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
      process.on(evt, (exception) => {
        if (evt === 'uncaughtException' || evt === 'unhandledRejection')
          console.error(exception);

        void (async () => {
          await removeConfigFile(ROOT_CONFIG_PATH);
          await deleteFixtures(fixtures);
          process.exit();
        })();
      });
    });
  })
  .catch(async (err) => {
    if (err instanceof Error) {
      await removeConfigFile(ROOT_CONFIG_PATH);
      await deleteFixtures(fixtures);
    }

    console.error(err);
  });
