import { docFixtures } from './tests/fixtures/doc';
import { pagesFixtures } from './tests/fixtures/pages';
import { DOC_FIXTURES_DIR, PAGES_FIXTURES_DIR } from './tests/utils/constants';
import {
  createFixtures,
  deleteFixturesIn,
} from './tests/utils/helpers/fixtures';
import { initServer } from './tests/utils/helpers/server';

const deleteFixturesOnExit = async () => {
  try {
    await deleteFixturesIn(DOC_FIXTURES_DIR);
    await deleteFixturesIn(PAGES_FIXTURES_DIR);
  } catch (e) {
    console.error('EXIT HANDLER ERROR', e);
  }

  process.exit();
};

await createFixtures(docFixtures);
await createFixtures(pagesFixtures);
await initServer({
  data: {
    doc: { baseUrl: '/doc', path: DOC_FIXTURES_DIR },
    pages: { baseUrl: '/', path: PAGES_FIXTURES_DIR },
  },
  endpoint: '/graphql',
  hostname: 'localhost',
  port: 4000,
})
  .then(({ server }) => {
    server.start();

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
          await deleteFixturesOnExit();
        })();
      });
    });
  })
  .catch(async (err) => {
    if (err instanceof Error) await deleteFixturesOnExit();

    console.error(err);
  });
