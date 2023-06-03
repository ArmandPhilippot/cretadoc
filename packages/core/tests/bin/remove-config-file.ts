import { ROOT_CONFIG_PATH } from '../utils/constants';
import { removeConfigFile } from '../utils/helpers';

await removeConfigFile(ROOT_CONFIG_PATH);
