import { dirname } from 'path';

export const ROOT_CONFIG_PATH = new URL(
  '../../cretadoc.config.js',
  import.meta.url
).pathname;

export const FIXTURES_DIR_PATH = dirname(
  new URL('../fixtures/', import.meta.url).pathname
);
