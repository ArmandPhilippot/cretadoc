export const updateDocFileMutation = `mutation UpdateDocFile($input: DocFileUpdateInput!) {
  docFileUpdate(input: $input) {
    ... on DocFilePayload {
      __typename
      file {
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
        excerpt
        id
        name
        parentPath
      }
    }
  }
}`;
