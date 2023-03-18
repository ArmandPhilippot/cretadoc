import {
  directoryCreate,
  directoryDelete,
  directoryUpdate,
} from './directories/directories.mutations';
import { fileCreate, fileDelete, fileUpdate } from './files/files.mutations';

export const docMutations = {
  docDirectoryCreate: directoryCreate,
  docDirectoryDelete: directoryDelete,
  docDirectoryUpdate: directoryUpdate,
  docFileCreate: fileCreate,
  docFileDelete: fileDelete,
  docFileUpdate: fileUpdate,
};
