export const deleteDocDirectoryMutation = `mutation DeleteDocDirectory($input: DocDirectoryDeleteInput!, $after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
  docDirectoryDelete(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
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
              ... on DocFile {
                id
                name
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
    ... on DocDirectoryDeleteErrors {
      __typename
      errors {
        id
        onlyEmpty
        path
      }
    }
  }
}`;
