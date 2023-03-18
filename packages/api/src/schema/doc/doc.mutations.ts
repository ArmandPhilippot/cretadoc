import { directoryCreate } from './directories/directories.mutations';
import { fileCreate, fileDelete, fileUpdate } from './files/files.mutations';

export const docMutations = {
  docDirectoryCreate: directoryCreate,
  docFileCreate: fileCreate,
  docFileDelete: fileDelete,
  docFileUpdate: fileUpdate,
};
