import { GraphQLObjectType } from 'graphql';
import { directory } from './directories/directories.queries';
import { file, files } from './files/files.queries';

export const DocType = new GraphQLObjectType({
  name: 'Doc',
  description: 'The documentation nodes.',
  fields: () => {
    return {
      directory,
      file,
      files,
    };
  },
});
