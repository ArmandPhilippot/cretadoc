export const docDirectoryQuery = `query DocDirectory($id: String, $path: String ) {
  doc {
    directory(id: $id, path: $path) {
      contents {
        directories {
          createdAt
          id
          name
          parent {
            id
            name
            path
          }
          path
          type
          updatedAt
        }
        files {
          createdAt
          id
          name
          parent {
            id
            name
            path
          }
          path
          type
          updatedAt
        }
      }
      createdAt
      id
      name
      parent {
        id
        name
        path
      }
      path
      type
      updatedAt
    }
  }
}`;

export const docDirectoriesQuery = `query DocDirectories($after: String, $first: Int, $offset: Int, $orderBy: DocDirectoryOrder, $where: DocDirectoryWhereInput) {
  doc {
    directories(
      after: $after
      first: $first
      offset: $offset
      orderBy: $orderBy
      where: $where
    ) {
      edges {
        cursor
        node {
          contents {
            directories {
              createdAt
              id
              name
              parent {
                id
                name
                path
              }
              path
              type
              updatedAt
            }
            files {
              createdAt
              id
              name
              parent {
                id
                name
                path
              }
              path
              type
              updatedAt
            }
          }
          createdAt
          id
          name
          parent {
            id
            name
            path
          }
          path
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
