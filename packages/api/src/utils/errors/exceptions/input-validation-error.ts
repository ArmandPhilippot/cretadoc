import { API_ERROR_CODE } from '../../constants';
import { CodifiedGraphQLError } from './codified-graphql-error';

export class InputValidationError extends CodifiedGraphQLError {
  constructor(message: string, args: string[]) {
    super(message, API_ERROR_CODE.BAD_USER_INPUT, { arguments: args });
  }
}
