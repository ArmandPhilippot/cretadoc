export const getDocDirectoryQuery = `query DocDirectory($id: String, $path: String, $slug: String) {
  doc {
    directory(id: $id, path: $path, slug: $slug) {
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
    }
  }
}`;
