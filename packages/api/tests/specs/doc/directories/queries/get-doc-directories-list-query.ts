export const getDocDirectoriesListQuery = `query DocDirectories($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
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
          contents
          createdAt
          entries {
            ... on DocFile {
              id
              name
              createdAt
              meta {
                createdAt
                status
                title
                updatedAt
              }
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
            ... on DocDirectory {
              id
              name
              createdAt
              meta {
                createdAt
                status
                title
                updatedAt
              }
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
              updatedAt
              type
            }
          }
          excerpt
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
