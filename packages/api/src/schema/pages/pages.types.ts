import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  Page,
  PageCreateErrors,
  PageCreatePayload,
  PageDeleteErrors,
  PageDeleteResult,
  PagePayload,
  PageUpdateErrors,
  PageUpdatePayload,
} from '../../types';
import {
  FrontMatterInputType,
  FrontMatterMetaType,
  createConnectionType,
  createOrderByType,
} from '../../utils/gql';

export const PageType = new GraphQLObjectType<Page, APIContext>({
  name: 'Page',
  description: 'A single page.',
  fields: () => {
    return {
      contents: {
        description: 'The contents of the page.',
        type: GraphQLString,
        resolve: ({ contents }) => contents,
      },
      createdAt: {
        description: 'The creation date of the page.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ createdAt }) => createdAt,
      },
      id: {
        description: 'The id of the page.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ id }) => id,
      },
      meta: {
        description: 'The frontmatter metadata of the page.',
        type: FrontMatterMetaType,
        resolve: ({ meta }) => meta,
      },
      name: {
        description: 'The page filename.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ name }) => name,
      },
      path: {
        description: 'The page path.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ path }) => path,
      },
      slug: {
        description: 'The page slug.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ slug }) => slug,
      },
      updatedAt: {
        description: 'The update date of the page.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

export const PagePayloadType = new GraphQLObjectType<PagePayload, APIContext>({
  name: 'PagePayload',
  description: 'The page payload.',
  fields: {
    page: {
      description: 'The requested page.',
      type: PageType,
    },
  },
});

export const PageConnectionType = createConnectionType(PageType);

const PageOrderFieldType = new GraphQLEnumType({
  name: `PageOrderField`,
  description: 'The ordering field.',
  values: {
    createdAt: {
      value: 'createdAt',
      description: 'Order pages by creation date.',
    },
    name: {
      value: 'name',
      description: 'Order pages by name.',
    },
    slug: {
      value: 'slug',
      description: 'Order pages by slug.',
    },
    updatedAt: {
      value: 'updatedAt',
      description: 'Order pages by last modification date.',
    },
  },
});

export const PageOrderByInputType = createOrderByType(
  PageType.name,
  PageOrderFieldType
);

export const PageWhereInputType = new GraphQLInputObjectType({
  name: 'PageWhereInput',
  description: 'The arguments for filtering the pages.',
  fields: {
    createdAt: {
      description: 'A substring of the creation date of the page.',
      type: GraphQLString,
    },
    name: {
      description: 'A substring of the page name.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the page.',
      type: GraphQLString,
    },
  },
});

export const PageCreateInputType = new GraphQLInputObjectType({
  name: 'PageCreateInput',
  description: 'The input to create a new page.',
  fields: {
    contents: {
      description: 'The page contents.',
      type: GraphQLString,
    },
    meta: {
      description: 'The page metadata.',
      type: FrontMatterInputType,
    },
    name: {
      description: 'The page name.',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const PageCreateValidationErrorsType = new GraphQLObjectType<
  PageCreateErrors['errors']
>({
  name: 'PageCreateValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
    },
    meta: {
      description: 'The validation errors on meta argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ meta }) => meta,
    },
    name: {
      description: 'The validation errors on name argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ name }) => name,
    },
  },
});

export const PageCreateErrorsType = new GraphQLObjectType<
  PageCreateErrors,
  APIContext
>({
  name: 'PageCreateErrors',
  description: 'The errors when creating a new page.',
  fields: {
    errors: {
      description: 'The validation errors when creating a new page.',
      type: PageCreateValidationErrorsType,
    },
  },
});

export const PageCreateResultType = new GraphQLUnionType({
  name: 'PageCreateResult',
  description: 'Either the page data or errors.',
  types: [PagePayloadType, PageCreateErrorsType],
  resolveType(value: PageCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'PageCreateErrors';

    return 'PagePayload';
  },
});

export const PageDeleteInputType = new GraphQLInputObjectType({
  name: 'PageDeleteInput',
  description: 'The input to delete an existing page.',
  fields: {
    id: {
      description: 'The page id.',
      type: GraphQLString,
    },
    name: {
      description: 'The page name.',
      type: GraphQLString,
    },
  },
});

const PageDeleteValidationErrorsType = new GraphQLObjectType<
  PageDeleteErrors['errors']
>({
  name: 'PageDeleteValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    id: {
      description: 'The validation errors on id argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ id }) => id,
    },
    name: {
      description: 'The validation errors on name argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ name }) => name,
    },
  },
});

export const PageDeleteErrorsType = new GraphQLObjectType<
  PageDeleteErrors,
  APIContext
>({
  name: 'PageDeleteErrors',
  description: 'The errors when deleting a page.',
  fields: {
    errors: {
      description: 'The validation errors when deleting a page.',
      type: PageDeleteValidationErrorsType,
    },
  },
});

export const PageDeleteResultType = new GraphQLUnionType({
  name: 'PageDeleteResult',
  description: 'Either the deleted page data or errors.',
  types: [PagePayloadType, PageDeleteErrorsType],
  resolveType(value: PageDeleteResult) {
    if (Object.hasOwn(value, 'errors')) return 'PageDeleteErrors';

    return 'PagePayload';
  },
});

export const PageUpdateInputType = new GraphQLInputObjectType({
  name: 'PageUpdateInput',
  description: 'The input to update an existing page.',
  fields: {
    contents: {
      description: 'The page contents.',
      type: GraphQLString,
    },
    id: {
      description: 'The page id.',
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      description: 'The page metadata.',
      type: FrontMatterInputType,
    },
    name: {
      description: 'The page name.',
      type: GraphQLString,
    },
  },
});

const PageUpdateValidationErrorsType = new GraphQLObjectType<
  PageUpdateErrors['errors']
>({
  name: 'PageUpdateValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
    },
    id: {
      description: 'The validation errors on id argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ id }) => id,
    },
    meta: {
      description: 'The validation errors on meta argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ meta }) => meta,
    },
    name: {
      description: 'The validation errors on name argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ name }) => name,
    },
  },
});

export const PageUpdateErrorsType = new GraphQLObjectType<
  PageUpdateErrors,
  APIContext
>({
  name: 'PageUpdateErrors',
  description: 'The errors when updating a page.',
  fields: {
    errors: {
      description: 'The validation errors when updating a page.',
      type: PageUpdateValidationErrorsType,
    },
  },
});

export const PageUpdateResultType = new GraphQLUnionType({
  name: 'PageUpdateResult',
  description: 'Either the updated page data or errors.',
  types: [PagePayloadType, PageUpdateErrorsType],
  resolveType(value: PageUpdatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'PageUpdateErrors';

    return 'PagePayload';
  },
});
