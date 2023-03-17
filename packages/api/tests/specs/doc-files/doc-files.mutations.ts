export const docFileCreate = `mutation CreateDocFile($input: DocFileCreateInput!) {
  docFileCreate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
        content
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
        content
        name
        parentPath
      }
    }
  }
}`;

export const docFileUpdate = `mutation UpdateDocFile($input: DocFileUpdateInput!) {
  docFileUpdate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
        content
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
        content
        id
        name
        parentPath
      }
    }
  }
}`;
