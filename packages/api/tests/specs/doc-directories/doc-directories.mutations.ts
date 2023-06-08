export const docDirectoryCreate = `mutation CreateDocDirectory($input: DocDirectoryCreateInput!) {
  docDirectoryCreate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents {
          directories {
            createdAt
            id
            name
            parent {
              id
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
            name
            parent {
              id
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
        name
        parent {
          id
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
        name
        parentPath
      }
    }
  }
}`;

export const docDirectoryDelete = `mutation DeleteDocDirectory($input: DocDirectoryDeleteInput!) {
  docDirectoryDelete(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents {
          directories {
            createdAt
            id
            name
            parent {
              id
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
            name
            parent {
              id
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
        name
        parent {
          id
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

export const docDirectoryUpdate = `mutation UpdateDocDirectory($input: DocDirectoryUpdateInput!) {
  docDirectoryUpdate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents {
          directories {
            createdAt
            id
            name
            parent {
              id
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
            name
            parent {
              id
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
        name
        parent {
          id
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
        name
        parentPath
      }
    }
  }
}`;
