export const deleteDocDirectoryMutation = `mutation DeleteDocDirectory($input: DocDirectoryDeleteInput!) {
  docDirectoryDelete(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents {
          directories {
            createdAt
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
    ... on DocDirectoryDeleteErrors {
      __typename
      errors {
        id
        path
      }
    }
  }
}`;
