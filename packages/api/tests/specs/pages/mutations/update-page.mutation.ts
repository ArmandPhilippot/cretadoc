export const updatePageMutation = `mutation UpdatePage($input: PageUpdateInput!) {
  pageUpdate(input: $input) {
    ... on PagePayload {
      __typename
      page {
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
        path
        slug
        updatedAt
      }
    }
    ... on PageUpdateErrors {
      __typename
      errors {
        contents
        excerpt
        id
        name
      }
    }
  }
}`;
