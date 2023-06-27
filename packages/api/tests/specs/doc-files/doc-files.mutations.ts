export const docFileCreate = `mutation CreateDocFile($input: DocFileCreateInput!) {
  docFileCreate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
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
    ... on DocFileCreateErrors {
      __typename
      errors {
        contents
        meta
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
