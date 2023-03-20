export const pageQuery = `query Page($id: String, $name: String) {
  page(id: $id, name: $name) {
    contents
    createdAt
    id
    name
    path
    updatedAt
  }
}`;

export const pagesQuery = `query Pages($after: String, $first: Int, $offset: Int, $orderBy: PageOrder, $where: PageWhereInput) {
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
        id
        name
        path
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
