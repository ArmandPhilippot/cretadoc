import { CORE_ERROR_CODE } from '../constants';
import { CretadocServerError } from './cretadoc-server-error';

export class ConfigError extends CretadocServerError {
  constructor(message: string) {
    super(CORE_ERROR_CODE.BAD_CONFIGURATION, message);
  }
}
