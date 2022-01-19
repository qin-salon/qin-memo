import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_SEARCH_HISTORIES_DB } from "./data";
import type { SearchHistoryType } from "./type";

const endpoint = `${API_URL}/users/:userId/searchHistories`;

/**
 * @package 自分の検索履歴を表示する
 */
export const getUsersUserIdSearchHistories = rest.get<never, { userId: string }, SearchHistoryType[]>(
  endpoint,
  (_req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES_DB));
  }
);

/**
 * @package 自分の検索履歴に追加する
 */
export const postUsersUserIdSearchHistories = rest.post<{ keyword: string }, { userId: string }, SearchHistoryType>(
  endpoint,
  (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({
        id: Math.random(),
        keyword: req.body.keyword,
        createdAt: new Date().toISOString(),
      })
    );
  }
);
