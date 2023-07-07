export const deletePageMutation = `mutation DeletePage($input: PageDeleteInput!) {
  pageDelete(input: $input) {
    ... on PagePayload {
      __typename
      page {
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
        path
        slug
        updatedAt
      }
    }
    ... on PageDeleteErrors {
      __typename
      errors {
        id
        name
      }
    }
  }
}`;
