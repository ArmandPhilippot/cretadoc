import type { Maybe } from '@cretadoc/utils';
import type { Connection, Edge } from '../../types';
import { generateCursor } from '../helpers';

/**
 * Retrieve the edges.
 *
 * @param {T[]} data - An array of objects.
 * @param {number} offset - The offset.
 * @returns {Array<Edge<T>>} The edges.
 */
export const getEdges = <T>(data: T[], offset: number): Array<Edge<T>> =>
  data.map((singleData, index) => {
    const currentItemNumber = index + 1;

    return {
      cursor: generateCursor(currentItemNumber + offset),
      node: singleData,
    };
  });

type GetConnectionProps<T> = {
  data: Maybe<T[]>;
  first: number;
  after: number;
  total?: number;
};

/**
 * Retrieve a GraphQL connection.
 *
 * @param props - An object.
 * @param props.after - The number of items before.
 * @param props.data - An array of items.
 * @param props.first - The number of items per page.
 * @param props.total - The total number of items.
 * @returns {Connection<T>} The connection.
 */
export const getConnection = <T>({
  after,
  data,
  first,
  total = 0,
}: GetConnectionProps<T>): Connection<T> => {
  const edges = data ? getEdges(data, after) : [];
  const lastEdge = edges[edges.length - 1];
  const endCursor = edges.length && lastEdge ? lastEdge.cursor : null;
  const startCursor = edges.length && edges[0] ? edges[0].cursor : null;

  return {
    edges,
    pageInfo: {
      endCursor,
      hasNextPage: edges.length === first,
      hasPreviousPage: after > 0,
      startCursor,
      total,
    },
  };
};
