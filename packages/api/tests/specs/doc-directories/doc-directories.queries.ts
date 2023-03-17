export const docDirectoryQuery = `query DocDirectory($id: String, $path: String ) {
  doc {
    directory(id: $id, path: $path) {
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
}`;
