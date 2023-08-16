export const pageMetaQuery = `query PageMeta($id: String, $name: String, $slug: String) {
  page(id: $id, name: $name, slug: $slug) {
    excerpt
    meta {
      createdAt
      seoDescription
      seoTitle
      status
      title
      updatedAt
    }
    name
  }
}`;
