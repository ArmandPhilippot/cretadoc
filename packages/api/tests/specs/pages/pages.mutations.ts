export const pageCreate = `mutation CreatePage($input: PageCreateInput!) {
  pageCreate(input: $input) {
    ... on PagePayload {
      __typename
      page {
        content
        createdAt
        id
        name
        path
        updatedAt
      }
    }
    ... on PageCreateErrors {
      __typename
      errors {
        content
        name
      }
    }
  }
}`;
