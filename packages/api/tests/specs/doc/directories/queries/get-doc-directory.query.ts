export const getDocDirectoryQuery = `query DocDirectory($id: String, $path: String, $slug: String) {
  doc {
    directory(id: $id, path: $path, slug: $slug) {
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
}`;
