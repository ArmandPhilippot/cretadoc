import {
  directoryCreate,
  directoryUpdate,
} from './directories/directories.mutations';
import { fileCreate, fileDelete, fileUpdate } from './files/files.mutations';

export const docMutations = {
  docDirectoryCreate: directoryCreate,
  docDirectoryUpdate: directoryUpdate,
  docFileCreate: fileCreate,
  docFileDelete: fileDelete,
  docFileUpdate: fileUpdate,
};
