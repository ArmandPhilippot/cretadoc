export const createDocDirectoryMutation = `mutation CreateDocDirectory($input: DocDirectoryCreateInput!, $after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
  docDirectoryCreate(input: $input) {
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
    ... on DocDirectoryCreateErrors {
      __typename
      errors {
        meta
        name
        parentPath
      }
    }
  }
}`;
