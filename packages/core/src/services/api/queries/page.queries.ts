export const pageQuery = `query Page($id: String, $name: String, $slug: String) {
  page(id: $id, name: $name, slug: $slug) {
    contents
    excerpt
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
    path
    slug
    updatedAt
  }
}`;
