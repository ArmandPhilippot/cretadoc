export const deleteDocDirectoryMutation = `mutation DeleteDocDirectory($input: DocDirectoryDeleteInput!) {
  docDirectoryDelete(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        createdAt
        contents
        entries {
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
        excerpt
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
