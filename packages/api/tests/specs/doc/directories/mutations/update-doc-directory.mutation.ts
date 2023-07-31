export const updateDocDirectoryMutation = `mutation UpdateDocDirectory($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput, $input: DocDirectoryUpdateInput!) {
  docDirectoryUpdate(input: $input) {
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
    ... on DocDirectoryUpdateErrors {
      __typename
      errors {
        id
        meta
        name
        parentPath
      }
    }
  }
}`;
