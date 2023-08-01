export const getDocFileQuery = `query DocFile($id: String, $path: String, $slug: String) {
  doc {
    file(id: $id, path: $path, slug: $slug) {
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
