export const getPagesListQuery = `query Pages($after: String, $first: Int, $offset: Int, $orderBy: PageOrderByInput, $where: PageWhereInput) {
  pages(
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
        path
        slug
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
}`;
