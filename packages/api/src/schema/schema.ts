import { GraphQLSchema } from 'graphql';
import { mutation } from './schema.mutations';
import { query } from './schema.queries';

export const schema = new GraphQLSchema({ query, mutation });
