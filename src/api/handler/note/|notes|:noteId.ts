import { rest } from "msw";

import { EXAMPLE_NOTE } from "./data";
import type { NoteType } from "./type";

const endpoint = "/notes/:noteId";

/**
 * @package 特定のメモの情報を取得する
 */
export const getNotesNoteId = rest.get<never, NoteType, { noteId: string }>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
});

/**
 * @package 特定のメモを更新する
 */
export const putNotesNoteId = rest.put<string, NoteType, { noteId: string }>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  const body: Pick<NoteType, "content"> = JSON.parse(req.body);
  // eslint-disable-next-line no-console
  console.log(body.content);
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_NOTE, id: noteId }));
});

/**
 * @package 特定のメモを削除する
 */
export const deleteNotesNoteId = rest.delete<never, Pick<NoteType, "id">, { noteId: string }>(
  endpoint,
  (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: noteId }));
  }
);
