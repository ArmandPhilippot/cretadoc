export const docEntryMetaQuery = `query DocEntry($id: String, $path: String, $slug: String) {
  doc {
    entry(id: $id, path: $path, slug: $slug) {
      ... on DocFile {
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
      ... on DocDirectory {
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
    }
  }
}`;
