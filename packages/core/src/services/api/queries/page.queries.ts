export const pageQuery = `query Page($id: String, $name: String, $slug: String) {
  page(id: $id, name: $name, slug: $slug) {
    contents
    createdAt
    id
    name
    path
    slug
    updatedAt
  }
}`;
