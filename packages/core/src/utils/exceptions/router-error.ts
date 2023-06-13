import { CORE_ERROR_CODE } from '../constants';
import { CretadocCoreError } from './cretadoc-core-error';

export class RouterError extends CretadocCoreError {
  constructor(message: string) {
    super(CORE_ERROR_CODE.BAD_ROUTER_RESPONSE, message);
  }
}
