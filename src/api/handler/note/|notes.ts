import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_LIST } from "./data";
import type { ListNoteType } from "./type";

const endpoint = `${API_URL}/notes`;

/**
 * @package 自分のメモ一覧を取得する
 */
export const getNotes = rest.get<string, never, ListNoteType[]>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_NOTE_LIST));
});
