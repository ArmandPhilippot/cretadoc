export const getDocFilesListQuery = `query DocFiles($after: String, $first: Int, $offset: Int, $orderBy: DocOrderByInput, $where: DocWhereInput) {
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
