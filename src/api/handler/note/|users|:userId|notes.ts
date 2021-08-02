import { rest } from "msw";

import { EXAMPLE_NOTE_LIST } from "./data";
import type { ListNoteType } from "./type";

const endpoint = "/users/:userId/notes";

/**
 * @package 自分または特定のユーザーのメモ一覧を取得する
 */
export const getUsersUserIdNotes = rest.get<never, ListNoteType[], { userId: string }>(endpoint, (req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_NOTE_LIST));
});
