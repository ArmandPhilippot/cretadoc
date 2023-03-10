import { pagesFixtures } from './tests/fixtures/pages';
import { PAGES_FIXTURES_DIR } from './tests/utils/constants';
import { createFixtures, cleanFixtures } from './tests/utils/helpers/fixtures';
import { createAPIServer } from './tests/utils/helpers/server';

const createAPI = async () => {
  await createFixtures(pagesFixtures);

  return createAPIServer({
    data: {
      pages: PAGES_FIXTURES_DIR,
    },
    endpoint: '/graphql',
    hostname: 'localhost',
    port: 4000,
  });
};

const deleteFixturesOnExit = async () => {
  try {
    await cleanFixtures(PAGES_FIXTURES_DIR);
  } catch (e) {
    console.error('EXIT HANDLER ERROR', e);
  }

  process.exit();
};

await createAPI().then((api) => {
  api.start();

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
        await deleteFixturesOnExit();
      })();
    });
  });
});
