import { join } from 'path';
import { PAGES_FIXTURES_DIR } from '../utils/constants';
import type { Fixture } from '../utils/helpers/fixtures';

export const pagesFixtures: Fixture[] = [
  {
    contents:
      '# Books\n\nThis is a list of my books:\n\n- Maxime ut odit\n- Minima sint quia\n- Qui quisquam aut\n',
    path: join(PAGES_FIXTURES_DIR, './books.md'),
  },
  {
    contents: '',
    path: join(PAGES_FIXTURES_DIR, './management-backing.md'),
  },
  {
    contents:
      '# The doc title\n\nEa sunt rerum qui ea dolorem magni eum modi maiores. Nihil et error omnis molestiae id iusto doloremque inventore assumenda. Consectetur sed consequatur. Id sunt non.\n\nExercitationem et ad rem harum autem et quae. Eum voluptatem sequi rerum atque eum accusantium enim. Eum eaque reiciendis vel modi.\n\nPraesentium eos sunt consequatur. Recusandae qui quia iure molestiae maiores. Temporibus eveniet adipisci consequuntur aut ab aperiam. Velit totam ullam hic et quaerat nihil iste aliquam sint.\n',
    path: join(PAGES_FIXTURES_DIR, './creative-transmitting-maine.md'),
  },
  {
    contents:
      'Neque vel consequatur cumque officia odit harum architecto a. Velit iusto odit in vero dolores. Ipsam laudantium sapiente mollitia aut repellat dolorem porro omnis assumenda. Est et autem aut qui sed aut pariatur fugiat omnis.',
    path: join(PAGES_FIXTURES_DIR, './pennsylvania-interactive-data.md'),
  },
  {
    contents: '',
    path: join(PAGES_FIXTURES_DIR, './dalasi.md'),
  },
  {
    contents: '',
    path: join(PAGES_FIXTURES_DIR, './notes.txt'),
  },
  {
    contents: '',
    path: join(PAGES_FIXTURES_DIR, './hard-computer-paradigm.less'),
  },
  {
    contents:
      '# Private\n\nDolores adipisci quia rem accusamus tempora. Cupiditate accusantium quasi est. Aut dolores alias quod mollitia ipsa omnis.',
    path: join(PAGES_FIXTURES_DIR, './folder/private.md'),
  },
];
