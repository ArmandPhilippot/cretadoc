import { GraphQLObjectType } from 'graphql';
import { directories, directory } from './directories/directories.queries';
import { file, files } from './files/files.queries';

export const DocType = new GraphQLObjectType({
  name: 'Doc',
  description: 'The documentation nodes.',
  fields: () => {
    return {
      directory,
      directories,
      file,
      files,
    };
  },
});
