export const docFileQuery = `query DocFile($id: String, $path: String, $slug: String) {
  doc {
    file(id: $id, path: $path, slug: $slug) {
      contents
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

export const docFilesQuery = `query DocFiles($after: String, $first: Int, $offset: Int, $orderBy: DocFileOrder, $where: DocFileWhereInput) {
  doc {
    files(
      after: $after
      first: $first
      offset: $offset
      orderBy: $orderBy
      where: $where
    ) {
      edges {
        cursor
        node {
          contents
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
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        total
      }
    }
  }
}`;
