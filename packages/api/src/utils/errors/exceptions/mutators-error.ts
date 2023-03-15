import { API_ERROR_CODE } from '../../constants';
import { CodifiedGraphQLError } from './codified-graphql-error';

export class MutatorsError extends CodifiedGraphQLError {
  constructor(message: string) {
    super(message, API_ERROR_CODE.BAD_CONFIGURATION);
  }
}
