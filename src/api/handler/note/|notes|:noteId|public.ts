import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_DB } from "./data";
import type { NoteType } from "./type";

const endpoint = `${API_URL}/notes/:noteId/public`;

/**
 * @package 特定のメモを公開する
 */
export const patchNotesNoteIdPublic = rest.patch<never, { noteId: string }, NoteType>(endpoint, (req, res, ctx) => {
  const note = EXAMPLE_NOTE_DB.find(({ id }) => {
    return id === req.params.noteId;
  });
  if (!note) {
    return res(ctx.status(404));
  }
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...note, isPublic: !note.isPublic }));
});
