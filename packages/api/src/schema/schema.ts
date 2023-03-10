import { GraphQLSchema } from 'graphql';
import { query } from './schema.queries';

export const schema = new GraphQLSchema({ query });
