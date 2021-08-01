import { postNotes } from "./|notes";
import { deleteNotesNoteId, getNotesNoteId, putNotesNoteId } from "./|notes|:noteId";
import { patchNotesNoteIdPublic } from "./|notes|:noteId|public";
import { getUsersUserIdNotes } from "./|users|:userId|notes";
import { getUsersUserIdNotesSearchKeyword } from "./|users|:userId|notes|search|:keyword";

/**
 * @package
 */
export const noteHandler = [
  postNotes,
  deleteNotesNoteId,
  getNotesNoteId,
  putNotesNoteId,
  patchNotesNoteIdPublic,
  getUsersUserIdNotes,
  getUsersUserIdNotesSearchKeyword,
];
