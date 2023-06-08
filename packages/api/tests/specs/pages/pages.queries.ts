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
