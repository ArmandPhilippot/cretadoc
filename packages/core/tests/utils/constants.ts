export const ROOT_CONFIG_PATH = new URL(
  '../../cretadoc.config.js',
  import.meta.url
).pathname;

export const FIXTURES_DIR_PATH = new URL('../fixtures/', import.meta.url)
  .pathname;

export const PAGES_FIXTURES_DIR_PATH = new URL(
  '../fixtures/pages/',
  import.meta.url
).pathname;
