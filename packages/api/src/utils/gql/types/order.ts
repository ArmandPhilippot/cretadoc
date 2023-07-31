import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { DIRECTION } from '../../constants';

/**
 * Create a new order direction GraphQL type.
 *
 * @param {string} typeName - The name of the type.
 * @returns {GraphQLEnumType} The order direction type.
 */
const createOrderDirectionType = (typeName: string): GraphQLEnumType =>
  new GraphQLEnumType({
    name: `${typeName}OrderDirection`,
    description: 'The ordering direction.',
    values: {
      ASC: {
        description:
          'Specifies an ascending order for a given orderBy argument.',
        value: DIRECTION.ASC,
      },
      DESC: {
        description:
          'Specifies a descending order for a given orderBy argument.',
        value: DIRECTION.DESC,
      },
    },
  });

/**
 * Create a new orderBy GraphQL type.
 *
 * @param {string} typeName - The name of the type.
 * @param {GraphQLEnumType} fieldType - The fields type.
 * @returns {GraphQLInputObjectType} The orderBy type.
 */
export const createOrderByType = (
  typeName: string,
  fieldType: GraphQLEnumType
): GraphQLInputObjectType => {
  const orderFieldType = fieldType;
  const orderDirectionType = createOrderDirectionType(typeName);

  return new GraphQLInputObjectType({
    name: `${typeName}OrderByInput`,
    description: 'The ordering.',
    fields: {
      field: {
        type: new GraphQLNonNull(orderFieldType),
      },
      direction: {
        type: new GraphQLNonNull(orderDirectionType),
      },
    },
  });
};
