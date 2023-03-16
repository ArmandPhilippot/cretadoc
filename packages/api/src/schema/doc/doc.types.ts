import { GraphQLObjectType } from 'graphql';
import { file } from './files/files.queries';

export const DocType = new GraphQLObjectType({
  name: 'Doc',
  description: 'The documentation nodes.',
  fields: () => {
    return {
      file,
    };
  },
});
