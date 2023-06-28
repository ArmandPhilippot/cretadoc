import {
  type GraphQLFieldConfigArgumentMap,
  type GraphQLInputType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { DEFAULT_EDGES_NUMBER } from '../constants';
import { generateCursor } from '../helpers';

type ConnectionArgsTypes = {
  orderBy: GraphQLInputType;
  where: GraphQLInputType;
};

/**
 * Retrieve the arguments to use on connection query.
 *
 * @param {ConnectionArgsTypes} types - The types of `orderBy` and `where` args.
 * @returns {GraphQLFieldConfigArgumentMap} The arguments.
 */
export const getConnectionArgs = (
  types: ConnectionArgsTypes
): GraphQLFieldConfigArgumentMap => {
  return {
    first: {
      defaultValue: DEFAULT_EDGES_NUMBER,
      description: 'Limits the number of results returned in a page.',
      type: GraphQLInt,
    },
    after: {
      defaultValue: generateCursor(0),
      description: 'The cursor value of an item returned in previous page.',
      type: GraphQLString,
    },
    offset: {
      description: 'The query offset.',
      type: GraphQLInt,
    },
    orderBy: {
      description: 'Reorder the results.',
      type: types.orderBy,
    },
    where: {
      description: 'Filter the results.',
      type: types.where,
    },
  };
};
