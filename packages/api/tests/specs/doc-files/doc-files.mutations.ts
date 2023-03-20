export const docFileCreate = `mutation CreateDocFile($input: DocFileCreateInput!) {
  docFileCreate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
        contents
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
    ... on DocFileCreateErrors {
      __typename
      errors {
        contents
        name
        parentPath
      }
    }
  }
}`;

export const docFileDelete = `mutation DeleteDocFile($input: DocFileDeleteInput!) {
  docFileDelete(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
        contents
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
    ... on DocFileDeleteErrors {
      __typename
      errors {
        id
        path
      }
    }
  }
}`;

export const docFileUpdate = `mutation UpdateDocFile($input: DocFileUpdateInput!) {
  docFileUpdate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
        contents
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
    ... on DocFileUpdateErrors {
      __typename
      errors {
        contents
        id
        name
        parentPath
      }
    }
  }
}`;
