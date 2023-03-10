export const pageQuery = `query Page($id: String, $name: String) {
  page(id: $id, name: $name) {
    content
    createdAt
    id
    name
    path
    updatedAt
  }
}`;
