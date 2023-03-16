export const docFileQuery = `query DocFile($id: String, $path: String) {
  doc {
    file(id: $id, path: $path) {
      content
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
