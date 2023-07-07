export const updateDocFileMutation = `mutation UpdateDocFile($input: DocFileUpdateInput!) {
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
