export const docEntryQuery = `query DocEntry($id: String, $path: String) {
  doc {
    entry(id: $id, path: $path) {
      __typename
      ... on DocFile {
        id
        name
        fileContents: contents
        createdAt
        parent {
          id
          name
          path
          slug
        }
        path
        slug
        type
        updatedAt
      }
      ... on DocDirectory {
        id
        name
        dirContents: contents {
          directories {
            createdAt
            id
            name
            parent {
              id
              name
              path
              slug
            }
            path
            slug
            type
            updatedAt
          }
          files {
            createdAt
            id
            name
            parent {
              id
              name
              path
              slug
            }
            path
            slug
            type
            updatedAt
          }
        }
        createdAt
        parent {
          id
          name
          path
          slug
        }
        path
        slug
        type
        updatedAt
      }
    }
  }
}`;

export const docEntriesQuery = `query DocEntries($after: String, $first: Int, $offset: Int, $orderBy: DocEntryOrder, $where: DocEntryWhereInput) {
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
          __typename
          ... on DocFile {
            id
            name
            fileContents: contents
            createdAt
            parent {
              id
              name
              path
              slug
            }
            path
            slug
            type
            updatedAt
          }
          ... on DocDirectory {
            id
            name
            dirContents: contents {
              directories {
                createdAt
                id
                name
                parent {
                  id
                  name
                  path
                  slug
                }
                path
                slug
                type
                updatedAt
              }
              files {
                createdAt
                id
                name
                parent {
                  id
                  name
                  path
                  slug
                }
                path
                slug
                type
                updatedAt
              }
            }
            createdAt
            parent {
              id
              name
              path
              slug
            }
            path
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
