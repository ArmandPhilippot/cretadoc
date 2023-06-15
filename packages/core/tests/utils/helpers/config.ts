import { unlink, writeFile } from 'fs/promises';
import { inspect } from 'util';
import { type PartialDeep, isObjKeyExist, isObject } from '@cretadoc/utils';
import type { CretadocConfig } from '../../../src/types/config';

const emptyConfig = '';

const getConfigExportFrom = (config: PartialDeep<CretadocConfig>) => `
export default ${inspect(config)}
`;

const getConfig = (
  kind: 'empty' | 'custom',
  customConfig?: PartialDeep<CretadocConfig>
) => {
  if (kind === 'empty') return emptyConfig;
  if (customConfig) return getConfigExportFrom(customConfig);
  throw new Error('Missing config.');
};

export const createConfigFile = async (
  path: string,
  kind: 'empty' | 'custom',
  customConfig?: PartialDeep<CretadocConfig>
) => {
  const config = getConfig(kind, customConfig);

  await writeFile(path, config, { flag: 'wx' })
    .then(() => {
      console.log(`[config]: Config file created in ${path}`);
    })
    .catch((err) => {
      const hasErrorCode = isObject(err) && isObjKeyExist(err, 'code');
      if (hasErrorCode && err.code === 'EEXIST')
        console.log(`[config]: Found an existent config file in ${path}.`);
      else throw err;
    });
};

export const removeConfigFile = async (path: string) => {
  await unlink(path)
    .then(() => {
      console.log(`[config]: Config file removed. Previous path was: ${path}`);
    })
    .catch((err) => {
      const hasErrorCode = isObject(err) && isObjKeyExist(err, 'code');
      if (hasErrorCode && err.code === 'ENOENT')
        console.log(
          `[config]: Nothing to remove. The given path does not exist.`
        );
      else throw err;
    });
};
