export const getDocEntryQuery = `query DocEntry($id: String, $path: String, $slug: String, $after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
  doc {
    entry(id: $id, path: $path, slug: $slug) {
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
        contents(
          after: $after
          first: $first
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          edges {
            cursor
            node {
              ... on DocDirectory {
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
              ... on DocFile {
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
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
            total
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
}`;
