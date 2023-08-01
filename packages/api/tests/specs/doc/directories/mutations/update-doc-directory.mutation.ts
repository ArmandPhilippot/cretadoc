export const updateDocDirectoryMutation = `mutation UpdateDocDirectory($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput, $input: DocDirectoryUpdateInput!) {
  docDirectoryUpdate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents
        createdAt
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
    ... on DocDirectoryUpdateErrors {
      __typename
      errors {
        contents
        excerpt
        id
        meta
        name
        parentPath
      }
    }
  }
}`;
