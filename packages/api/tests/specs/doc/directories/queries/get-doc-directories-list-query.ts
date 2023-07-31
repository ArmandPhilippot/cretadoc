export const getDocDirectoriesListQuery = `query DocDirectories($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput, $entriesAfter: String, $entriesFirst: Int, $entriesOffset: Int, $entriesOrderBy: DocOrderByInput, $entriesWhere: DocWhereInput) {
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
          entries(
            after: $entriesAfter
            first: $entriesFirst
            offset: $entriesOffset
            orderBy: $entriesOrderBy
            where: $entriesWhere
          ) {
            edges {
              cursor
              node {
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
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
              total
            }
          }
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
