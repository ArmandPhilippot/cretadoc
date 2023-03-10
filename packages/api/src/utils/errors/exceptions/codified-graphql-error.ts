import { GraphQLError, type GraphQLErrorExtensions } from 'graphql';
import type { APIErrorCode } from 'src/types';

export class CodifiedGraphQLError extends GraphQLError {
  public override extensions: GraphQLErrorExtensions;

  constructor(
    message: string,
    code: APIErrorCode,
    extensions?: GraphQLErrorExtensions
  ) {
    super(message);
    this.extensions = {
      code,
      ...extensions,
    };
  }
}
