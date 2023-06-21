import { GraphQLError } from 'graphql';
import { API_ERROR_CODE } from '../constants';

export class UserInputError extends GraphQLError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, {
      extensions: {
        cretadoc: {
          code: API_ERROR_CODE.BAD_USER_INPUT,
          ...details,
        },
      },
    });
  }
}
