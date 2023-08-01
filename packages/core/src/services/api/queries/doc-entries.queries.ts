export const docEntriesQuery = `query DocEntries($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
  doc {
    entries(
      after: $after
      first: $first
      offset: $offset
      orderBy: $orderBy
      where: $where
    ) {
      edges {
        cursor
        node {
          ... on DocFile {
            createdAt
            excerpt
            id
            meta {
              createdAt
              status
              title
              updatedAt
            }
            name
            slug
            type
            updatedAt
          }
          ... on DocDirectory {
            createdAt
            excerpt
            id
            meta {
              createdAt
              status
              title
              updatedAt
            }
            name
            slug
            type
            updatedAt
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        total
      }
    }
  }
}`;
