export const docDirectoryCreate = `mutation CreateDocDirectory($input: DocDirectoryCreateInput!) {
  docDirectoryCreate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        content {
          directories {
            createdAt
            id
            name
            parent {
              id
              name
              path
            }
            path
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
            }
            path
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
        }
        path
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

export const docDirectoryUpdate = `mutation UpdateDocDirectory($input: DocDirectoryUpdateInput!) {
  docDirectoryUpdate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        content {
          directories {
            createdAt
            id
            name
            parent {
              id
              name
              path
            }
            path
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
            }
            path
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
        }
        path
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
