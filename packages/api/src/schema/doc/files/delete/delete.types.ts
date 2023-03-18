import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  DocFileDeleteErrors,
  DocFileDeleteResult,
} from '../../../../types';
import { DocFilePayloadType } from '../files.types';

export const DocFileDeleteInputType = new GraphQLInputObjectType({
  name: 'DocFileDeleteInput',
  description: 'The input to delete an existing documentation file.',
  fields: {
    id: {
      description: 'The documentation file id.',
      type: GraphQLString,
    },
    path: {
      description: 'The documentation file path.',
      type: GraphQLString,
    },
  },
});

export const DocFileDeleteErrorsType = new GraphQLObjectType<
  DocFileDeleteErrors,
  APIContext
>({
  name: 'DocFileDeleteErrors',
  description: 'The errors when deleting a documentation file.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocFileDeleteErrors['errors']>({
        name: 'DocFileDeleteErrorsProperties',
        fields: {
          id: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ id }) => id,
          },
          path: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ path }) => path,
          },
        },
      }),
    },
  },
});

export const DocFileDeleteResultType = new GraphQLUnionType({
  name: 'DocFileDeleteResult',
  description: 'Either the deleted documentation file or errors.',
  types: [DocFilePayloadType, DocFileDeleteErrorsType],
  resolveType(value: DocFileDeleteResult) {
    if (Object.hasOwn(value, 'errors')) return 'DocFileDeleteErrors';

    return 'DocFilePayload';
  },
});
