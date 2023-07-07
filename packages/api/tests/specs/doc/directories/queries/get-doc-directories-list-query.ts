export const getDocDirectoriesListQuery = `query DocDirectories($after: String, $first: Int, $offset: Int, $orderBy: DocDirectoryOrder, $where: DocDirectoryWhereInput) {
  doc {
    directories(
      after: $after
      first: $first
      offset: $offset
      orderBy: $orderBy
      where: $where
    ) {
      edges {
        cursor
        node {
          contents {
            directories {
              createdAt
              id
              meta {
                createdAt
                status
                title
                updatedAt
              }
              name
              parent {
                id
                meta {
                  createdAt
                  status
                  title
                  updatedAt
                }
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
              meta {
                createdAt
                status
                title
                updatedAt
              }
              name
              parent {
                id
                meta {
                  createdAt
                  status
                  title
                  updatedAt
                }
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
          id
          meta {
            createdAt
            seoDescription
            seoTitle
            status
            title
            updatedAt
          }
          name
          parent {
            id
            meta {
              createdAt
              status
              title
              updatedAt
            }
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
