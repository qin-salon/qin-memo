import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_LIST } from "./data";
import type { ListNoteType, NoteType } from "./type";

const endpoint = `${API_URL}/users/:userId/notes`;

/**
 * @package 自分または特定のユーザーのメモ一覧を取得する
 */
export const getUsersUserIdNotes = rest.get<never, { userId: string }, ListNoteType[]>(endpoint, (req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_NOTE_LIST));
});

/**
 * @package 新しいメモを作成する
 */
export const postUsersUserIdNotes = rest.post<string, never, Pick<NoteType, "id">>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
});
