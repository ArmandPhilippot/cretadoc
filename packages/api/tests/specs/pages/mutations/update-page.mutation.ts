export const updatePageMutation = `mutation UpdatePage($input: PageUpdateInput!) {
  pageUpdate(input: $input) {
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
    ... on PageUpdateErrors {
      __typename
      errors {
        contents
        id
        name
      }
    }
  }
}`;
