export const updateDocDirectoryMutation = `mutation UpdateDocDirectory($input: DocDirectoryUpdateInput!) {
  docDirectoryUpdate(input: $input) {
    ... on DocDirectoryPayload {
      __typename
      directory {
        contents
        createdAt
        entries {
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
