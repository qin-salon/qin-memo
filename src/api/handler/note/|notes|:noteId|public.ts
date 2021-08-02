import { rest } from "msw";

import { EXAMPLE_NOTE } from "./data";
import type { NoteType } from "./type";

const endpoint = "/notes/:noteId/public";

/**
 * @package 特定のメモを公開する
 */
export const patchNotesNoteIdPublic = rest.patch<never, NoteType, { noteId: string }>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId, public: !EXAMPLE_NOTE.public }));
});
