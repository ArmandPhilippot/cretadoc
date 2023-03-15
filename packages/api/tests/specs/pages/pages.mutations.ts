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

export const pageUpdate = `mutation UpdatePage($input: PageUpdateInput!) {
  pageUpdate(input: $input) {
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
    ... on PageUpdateErrors {
      __typename
      errors {
        content
        id
        name
      }
    }
  }
}`;
