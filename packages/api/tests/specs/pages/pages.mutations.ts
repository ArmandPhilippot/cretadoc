export const pageCreate = `mutation CreatePage($input: PageCreateInput!) {
  pageCreate(input: $input) {
    ... on PagePayload {
      __typename
      page {
        contents
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
        contents
        name
      }
    }
  }
}`;

export const pageDelete = `mutation DeletePage($input: PageDeleteInput!) {
  pageDelete(input: $input) {
    ... on PagePayload {
      __typename
      page {
        contents
        createdAt
        id
        name
        path
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

export const pageUpdate = `mutation UpdatePage($input: PageUpdateInput!) {
  pageUpdate(input: $input) {
    ... on PagePayload {
      __typename
      page {
        contents
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
        contents
        id
        name
      }
    }
  }
}`;
