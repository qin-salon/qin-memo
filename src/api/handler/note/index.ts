import { getNotes } from "./|notes";
import { deleteNotesNoteId, getNotesNoteId, putNotesNoteId } from "./|notes|:noteId";
import { patchNotesNoteIdPublic } from "./|notes|:noteId|public";
import { getUsersUserIdNotes, postUsersUserIdNotes } from "./|users|:userId|notes";
import { getUsersUserIdNotesSearchKeyword } from "./|users|:userId|notes|search|:keyword";

/**
 * @package
 */
export const noteHandler = [
  getNotes,
  deleteNotesNoteId,
  getNotesNoteId,
  putNotesNoteId,
  patchNotesNoteIdPublic,
  getUsersUserIdNotes,
  postUsersUserIdNotes,
  getUsersUserIdNotesSearchKeyword,
];
