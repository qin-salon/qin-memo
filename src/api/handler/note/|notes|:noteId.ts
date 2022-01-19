import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_DB } from "./data";
import type { NoteType } from "./type";

const endpoint = `${API_URL}/notes/:noteId`;

/**
 * @package 特定のメモの情報を取得する
 */
export const getNotesNoteId = rest.get<never, { noteId: string }, NoteType>(endpoint, (req, res, ctx) => {
  const { noteId } = req.params;
  const note = EXAMPLE_NOTE_DB.find(({ id }) => {
    return id === noteId;
  }) as NoteType;
  return res(ctx.delay(1000), ctx.status(200), ctx.json(note));
});

/**
 * @package 特定のメモを更新する
 */
export const putNotesNoteId = rest.put<string, Pick<NoteType, "content">, undefined>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200));
});

/**
 * @package 特定のメモを削除する
 */
export const deleteNotesNoteId = rest.delete<never, { noteId: string }, Pick<NoteType, "id">>(
  endpoint,
  (req, res, ctx) => {
    const { noteId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: noteId }));
  }
);
