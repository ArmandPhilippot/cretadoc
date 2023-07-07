export const getDocEntriesListQuery = `query DocEntries($after: String, $first: Int, $offset: Int, $orderBy: DocEntryOrder, $where: DocEntryWhereInput) {
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
            meta {
              createdAt
              seoDescription
              seoTitle
              status
              title
              updatedAt
            }
            name
            fileContents: contents
            createdAt
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
            meta {
              createdAt
              seoDescription
              seoTitle
              status
              title
              updatedAt
            }
            name
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
