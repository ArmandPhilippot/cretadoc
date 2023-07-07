import { describe, expect, it } from 'vitest';
import { getConnection, getEdges } from './resolvers';

describe('get-edges', () => {
  it('returns the edges from an array of data', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const edges = getEdges(data, 0);

    expect(edges.length).toBe(data.length);
    expect(edges.every((edge) => data.includes(edge.node))).toBe(true);
    expect(edges.every((edge) => 'cursor' in edge)).toBe(true);
  });
});

/* eslint-disable max-statements */
describe('get-connection', () => {
  it('returns a GraphQL connection from the given data', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const first = 10;
    const total = data.length;
    const offset = 0;
    const connection = getConnection({
      after: offset,
      data,
      first,
    });

    expect(connection.edges.length).toBe(data.length);
    expect(connection.pageInfo.hasNextPage).toBe(total > first);
    expect(connection.pageInfo.hasPreviousPage).toBe((offset as number) > 0);
    expect(connection.pageInfo.endCursor).toBeTruthy();
    expect(connection.pageInfo.startCursor).toBeTruthy();
    expect(connection.pageInfo.total).toBe(total);
  });
});
/* eslint-enable max-statements */
