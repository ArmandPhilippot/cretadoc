export const deleteDocFileMutation = `mutation DeleteDocFile($input: DocFileDeleteInput!) {
  docFileDelete(input: $input) {
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
    ... on DocFileDeleteErrors {
      __typename
      errors {
        id
        path
      }
    }
  }
}`;
