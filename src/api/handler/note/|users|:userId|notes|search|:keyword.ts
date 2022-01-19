import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_DB } from "./data";
import type { ListNoteType } from "./type";

const endpoint = `${API_URL}/users/:userId/notes/search`;

/**
 * @package ユーザーのメモ一覧を検索して取得する
 */
export const getUsersUserIdNotesSearchKeyword = rest.get<string, { userId: string; keyword: string }, ListNoteType[]>(
  endpoint,
  (req, res, ctx) => {
    const query = req.url.searchParams.get("q");
    const data = EXAMPLE_NOTE_DB.filter((note) => {
      return query && note.content.toLowerCase().includes(query);
    });
    return res(ctx.delay(1000), ctx.status(200), ctx.json(data));
  }
);
