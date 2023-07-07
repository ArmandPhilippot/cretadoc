export const getDocEntryQuery = `query DocEntry($id: String, $path: String, $slug: String) {
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
        contents {
          directories {
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
