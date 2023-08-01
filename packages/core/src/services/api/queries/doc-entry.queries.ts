export const docEntryQuery = `query DocEntry($id: String, $path: String, $slug: String) {
  doc {
    entry(id: $id, path: $path, slug: $slug) {
      ... on DocFile {
        contents
        createdAt
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
            status
            title
          }
          name
          slug
        }
        slug
        type
        updatedAt
      }
      ... on DocDirectory {
        contents
        createdAt
        entries {
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
                status
                title
              }
              name
              slug
            }
            slug
            type
            updatedAt
          }
          ... on DocFile {
            createdAt
            id
            meta {
              status
              title
            }
            name
            parent {
              id
              meta {
                status
                title
              }
              name
              slug
            }
            slug
            type
            updatedAt
          }
        }
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
            status
            title
          }
          name
          slug
        }
        slug
        type
        updatedAt
      }
    }
  }
}`;
