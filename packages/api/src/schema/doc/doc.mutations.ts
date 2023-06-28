import { docDirectoriesMutations } from './directories';
import { docFilesMutations } from './files';

export const docMutations = {
  ...docDirectoriesMutations,
  ...docFilesMutations,
};
