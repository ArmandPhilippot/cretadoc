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

const legalNoticeFixtureName = 'Legal notice';
const fixtures: Fixture[] = [
  { name: 'home', contents: '# Home\n\nWelcome to Cretadoc homepage!' },
  {
    name: 'about',
    contents:
      '# About\n\n## Sed vel modi\n\nSapiente autem saepe et quisquam voluptate. Harum eos odit autem eius. Laudantium voluptatum maxime accusantium dolor in sequi esse fuga sed. Voluptate aliquid ipsam animi saepe autem eius voluptatibus sapiente. Quis dolor repudiandae repudiandae. Et sunt est ab incidunt animi odit cum.\n\n## Accusantium quia id\n\nNatus sit inventore aut excepturi quis perferendis et. Rerum aspernatur maiores voluptatum animi consequatur iure. Mollitia et aut. Officiis ut odit inventore maxime.',
  },
  {
    name: legalNoticeFixtureName,
    contents:
      '---\ntitle: Legal notice\n---\n\n## Sed vel modi\n\n### Debitis enim eum\n\nSapiente autem saepe et quisquam voluptate. Harum eos odit autem eius. Laudantium voluptatum maxime accusantium dolor in sequi esse fuga sed. Voluptate aliquid ipsam animi saepe autem eius voluptatibus sapiente. Quis dolor repudiandae repudiandae. Et sunt est ab incidunt animi odit cum.\n\n### Nemo assumenda et\n\nNulla velit inventore. Officia expedita voluptas aliquid quo repellendus. Ut doloremque quia consequatur sunt est vitae culpa.\n\n## Accusantium quia id\n\nNatus sit inventore aut excepturi quis perferendis et. Rerum aspernatur maiores voluptatum animi consequatur iure. Mollitia et aut. Officiis ut odit inventore maxime.',
  },
];

await createConfigFile(ROOT_CONFIG_PATH, 'custom', {
  name: 'Cretadoc',
  locale: 'en',
  pages: {
    legalNotice: legalNoticeFixtureName,
  },
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
