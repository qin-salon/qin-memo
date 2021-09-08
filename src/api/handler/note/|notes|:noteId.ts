import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_DB } from "./data";
import type { NoteType } from "./type";

const endpoint = `${API_URL}/notes/:noteId`;

/**
 * @package 特定のメモの情報を取得する
 */
export const getNotesNoteId = rest.get<never, NoteType, { noteId: string }>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  const note = EXAMPLE_NOTE_DB.find(({ id }) => {
    return id === noteId;
  }) as NoteType;
  return res(ctx.delay(1000), ctx.status(200), ctx.json(note));
});

/**
 * @package 特定のメモを更新する
 */
export const putNotesNoteId = rest.put<string, undefined, Pick<NoteType, "content">>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200));
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
