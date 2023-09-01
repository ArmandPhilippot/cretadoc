import { fileURLToPath } from 'node:url';

export const ROOT_CONFIG_PATH = fileURLToPath(
  new URL('../../cretadoc.config.js', import.meta.url)
);

export const FIXTURES_DIR_PATH = fileURLToPath(
  new URL('../fixtures/', import.meta.url)
);

export const DOC_FIXTURES_DIR_PATH = fileURLToPath(
  new URL('../fixtures/doc/', import.meta.url)
);

export const PAGES_FIXTURES_DIR_PATH = fileURLToPath(
  new URL('../fixtures/pages/', import.meta.url)
);
