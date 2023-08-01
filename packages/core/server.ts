import { createCretadocApp } from './src';
import {
  DOC_FIXTURES_DIR_PATH,
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
const docFixtures: Fixture[] = [
  {
    name: 'intro',
    contents: '---\ntitle: Introduction\n---\n\nWelcome to documentation.',
  },
  {
    name: 'index',
    parentPath: './dir1',
    contents: '---\ntitle: First directory\n---\n',
  },
  {
    name: 'file 1',
    parentPath: './dir1',
    contents: 'This is the first documentation file.',
  },
  {
    name: 'file 2',
    parentPath: './dir1',
    contents: 'This is the second documentation file.',
  },
  {
    name: 'file 3',
    parentPath: './dir1',
    contents: 'This is the third documentation file.',
  },
  {
    name: 'file 4',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 5',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 6',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 7',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 8',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 9',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 10',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'file 11',
    parentPath: './dir1',
    contents: 'This is another documentation file.',
  },
  {
    name: 'nested file 1',
    parentPath: './dir1/nested-dir/',
    contents: 'This is a nested documentation file.',
  },
  {
    name: 'adipisci aut rem',
    parentPath: './odio',
    contents:
      'Assumenda dolorem officiis mollitia dicta molestiae. In facere unde. Quibusdam atque fugiat eveniet deserunt autem. Ut autem debitis. Modi adipisci ratione dolor distinctio mollitia in. Dicta impedit aut.',
  },
  {
    name: 'nam adipisci consectetur',
    parentPath: './rem',
    contents:
      'Quis voluptatibus autem architecto accusamus beatae aliquam aut. Debitis libero quia quia velit eum vel. Fugit modi officiis voluptatem minima dolorem eos est vero voluptatum. Sit accusamus expedita mollitia voluptas ratione. Eum aut rerum at. Voluptatem numquam earum id perferendis vero aut excepturi dolorem magni.',
  },
  {
    name: 'modi laborum assumenda',
    parentPath: './voluptatem sit esse',
    contents:
      'Consequuntur qui assumenda accusantium id qui. Asperiores expedita harum. Nemo officia possimus est maiores omnis repudiandae ut id.',
  },
  {
    name: 'voluptatum',
    parentPath: './accusamus',
    contents:
      'Fuga id veritatis totam repellat veniam est. Quae quo enim. Ratione illum cum ullam quisquam eum. Blanditiis quisquam consequatur nam. Alias sit nobis adipisci sit quia placeat qui sunt.',
  },
  {
    name: 'doloremque',
    parentPath: './consequatur',
    contents:
      'Voluptates ut illo vero sapiente fugit in voluptatem. Et iusto voluptatem labore voluptate natus est voluptatem veniam. Atque optio sit id ea autem.',
  },
  {
    name: 'culpa ut nihil',
    parentPath: './eveniet',
    contents:
      'Et eos et quod officiis consectetur consequuntur quaerat. Quia in fugiat similique. Omnis aliquid expedita modi quasi aut recusandae et ut. Veniam et aspernatur nam. Iste suscipit aut odit. Repellat omnis debitis.',
  },
  {
    name: 'sapiente',
    parentPath: './odio',
    contents:
      'Expedita est ab ea illum aut. Officia quae assumenda aliquid possimus culpa accusantium. Sit sit ut esse reprehenderit. Totam inventore est quod velit. Ut dignissimos illum non architecto minus et rem quo eum.',
  },
  {
    name: 'sapiente dolores vel',
    parentPath: './doloremque',
    contents:
      'Magnam fugiat nisi nostrum fugiat animi dolores natus ea. Vitae modi consequatur. Ullam consequuntur sed id praesentium. Rerum repudiandae ipsam cum iure. Voluptatibus natus ducimus nihil rem qui vero eum earum voluptatem. Dolore iste qui sit.',
  },
  {
    name: 'incidunt nemo porro',
    parentPath: './perspiciatis',
    contents:
      'Voluptas maxime voluptatem. Et est cum cumque exercitationem. Consequatur quas aut cumque nisi. Eligendi dignissimos dolorem quo pariatur est iusto voluptas quia tempore.',
  },
  {
    name: 'officiis',
    parentPath: './quam',
    contents:
      'A aliquam blanditiis repudiandae et labore voluptas voluptatum. Enim adipisci quasi aut. Eligendi unde aut assumenda temporibus.',
  },
];
const pageFixtures: Fixture[] = [
  {
    name: 'home',
    contents: '---\ntitle: Home\n---\n\n\n\nWelcome to Cretadoc homepage!',
  },
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
    doc: DOC_FIXTURES_DIR_PATH,
    pages: PAGES_FIXTURES_DIR_PATH,
  },
});

await createFixtures(docFixtures, DOC_FIXTURES_DIR_PATH);
await createFixtures(pageFixtures, PAGES_FIXTURES_DIR_PATH);

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
          await deleteFixtures(docFixtures, DOC_FIXTURES_DIR_PATH);
          await deleteFixtures(pageFixtures, PAGES_FIXTURES_DIR_PATH);
          process.exit();
        })();
      });
    });
  })
  .catch(async (err) => {
    if (err instanceof Error) {
      await removeConfigFile(ROOT_CONFIG_PATH);
      await deleteFixtures(docFixtures, DOC_FIXTURES_DIR_PATH);
      await deleteFixtures(pageFixtures, PAGES_FIXTURES_DIR_PATH);
    }

    console.error(err);
  });
