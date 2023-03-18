import { fileCreate, fileDelete, fileUpdate } from './files/files.mutations';

export const docMutations = {
  docFileCreate: fileCreate,
  docFileDelete: fileDelete,
  docFileUpdate: fileUpdate,
};
