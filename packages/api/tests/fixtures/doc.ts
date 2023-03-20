import { join } from 'path';
import { DOC_FIXTURES_DIR } from '../utils/constants';
import type { Fixture } from '../utils/helpers';

export const docFixtures: Fixture[] = [
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './engineer_michigan.vtu'),
  },
  {
    contents:
      'Velit voluptas consequatur ut unde molestiae autem. Ut labore sint eveniet maxime. Ullam ipsa ea modi. Facilis maxime laborum dolorem alias deleniti omnis. Dolorem rerum dicta sint temporibus ut sed.',
    path: join(DOC_FIXTURES_DIR, './haptic.txt'),
  },
  {
    contents:
      '# Schemas redundant\n\nQuo et dolorem aut debitis. Dolorum repellendus rerum sapiente molestiae ut at rerum voluptates omnis. Eum numquam ab.',
    path: join(DOC_FIXTURES_DIR, './schemas-redundant.md'),
  },
  {
    contents: '',
    path: join(
      DOC_FIXTURES_DIR,
      './excepturi/doloremque/valley-rubber-standardization.md'
    ),
  },
  {
    contents:
      '# Generate yellow invoice\n\nPerferendis qui accusamus temporibus culpa facere eius perspiciatis unde quam. Enim maxime sit ut quis ducimus aut. Dignissimos in explicabo aut ut voluptas consequatur ex. Omnis molestiae rem amet. Provident aut magnam iste vero inventore. Architecto assumenda id et cumque ab maxime.',
    path: join(DOC_FIXTURES_DIR, './excepturi/generate-yellow-invoice.md'),
  },
  {
    contents: '# Eum asperiores repudiandae',
    path: join(DOC_FIXTURES_DIR, './autem/eum-asperiores-repudiandae.md'),
  },
  {
    contents: '# Est iusto id',
    path: join(DOC_FIXTURES_DIR, './autem/est-iusto-id.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './autem/voluptas-non-nihil.md'),
  },
  {
    contents: '# Possimus nostrum sed',
    path: join(DOC_FIXTURES_DIR, './rerum/possimus-nostrum-sed.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './saepe/dolorem-quibusdam-quas.txt'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './sit/sit-deserunt-dolorem.md'),
  },
  {
    contents: '',
    path: join(DOC_FIXTURES_DIR, './cumque/minus-exercitationem-deleniti.md'),
  },
];
