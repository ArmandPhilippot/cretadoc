export const createPageMutation = `mutation CreatePage($input: PageCreateInput!) {
  pageCreate(input: $input) {
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
    ... on PageCreateErrors {
      __typename
      errors {
        contents
        excerpt
        meta
        name
      }
    }
  }
}`;
