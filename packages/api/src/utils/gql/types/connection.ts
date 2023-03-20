import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  type GraphQLUnionType,
} from 'graphql';
import type { APIContext, Connection, Edge, PageInfo } from '../../../types';

/**
 * Create a new edge type from the given type.
 *
 * @param {GraphQLObjectType<T, APIContext> | GraphQLUnionType} type - A type.
 * @returns {GraphQLObjectType<Edge<T>, APIContext>} The edge type.
 */
export const createEdgeType = <T>(
  type: GraphQLObjectType<T, APIContext> | GraphQLUnionType
): GraphQLObjectType<Edge<T>, APIContext> =>
  new GraphQLObjectType<Edge<T>, APIContext>({
    name: `${type.name}Edge`,
    description: `A ${type.name} edge.`,
    fields: () => {
      return {
        node: {
          type,
          description: `A single ${type.name} node.`,
          resolve: ({ node }) => node,
        },
        cursor: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'A cursor.',
          resolve: ({ cursor }) => cursor,
        },
      };
    },
  });

/**
 * Create a new PageInfo GraphQL type.
 *
 * @param {string} typeName - The name of the connection type.
 * @returns {GraphQLObjectType<PageInfo, APIContext>} The PageInfo type.
 */
export const createPageInfoType = (
  typeName: string
): GraphQLObjectType<PageInfo, APIContext> =>
  new GraphQLObjectType<PageInfo, APIContext>({
    name: `${typeName}PageInfo`,
    description: 'Information about pagination in a connection.',
    fields: () => {
      return {
        endCursor: {
          type: GraphQLString,
          description: 'The item at the end of the edge.',
          resolve: ({ endCursor }) => endCursor,
        },
        hasNextPage: {
          type: GraphQLBoolean,
          description: 'When paginating forwards, are there more items?',
          resolve: ({ hasNextPage }) => hasNextPage,
        },
        hasPreviousPage: {
          type: GraphQLBoolean,
          description: 'When paginating backwards, are there more items?',
          resolve: ({ hasPreviousPage }) => hasPreviousPage,
        },
        startCursor: {
          type: GraphQLString,
          description: 'The item at the start of the edge.',
          resolve: ({ startCursor }) => startCursor,
        },
        total: {
          type: GraphQLInt,
          description: 'The total number of items.',
          resolve: ({ total }) => total,
        },
      };
    },
  });

/**
 * Create a new connection GraphQL type.
 *
 * @param {GraphQLObjectType<T, APIContext> | GraphQLUnionType} type - The type.
 * @returns {GraphQLObjectType<Connection<T>, APIContext>} The connection type.
 */
export const createConnectionType = <T>(
  type: GraphQLObjectType<T, APIContext> | GraphQLUnionType
): GraphQLObjectType<Connection<T>, APIContext> => {
  const name = `${type.name}Connection`;
  const edgeType = createEdgeType(type);
  const pageInfoType = createPageInfoType(name);

  return new GraphQLObjectType<Connection<T>, APIContext>({
    name,
    description: 'A connection page.',
    fields: () => {
      return {
        edges: {
          type: new GraphQLList(edgeType),
          description: 'A list of edges.',
          resolve: ({ edges }) => edges,
        },
        pageInfo: {
          type: new GraphQLNonNull(pageInfoType),
          resolve: ({ pageInfo }) => pageInfo,
        },
      };
    },
  });
};
