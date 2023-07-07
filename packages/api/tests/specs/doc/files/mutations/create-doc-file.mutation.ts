export const createDocFileMutation = `mutation CreateDocFile($input: DocFileCreateInput!) {
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
