import { rest } from "msw";

import type { SearchHistoryType } from "./type";

const endpoint = "/users/:userId/searchHistories";

/**
 * @package 自分の検索履歴を表示する
 */
export const getUsersUserIdSearchHistories = rest.get<never, SearchHistoryType[], { userId: string }>(
  endpoint,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES));
  }
);

/**
 * @package 自分の検索履歴に追加する
 */
export const postUsersUserIdSearchHistories = rest.post<string, { id: string }, { userId: string }>(
  endpoint,
  (req, res, ctx) => {
    const body: Pick<SearchHistoryType, "keyword"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body.keyword);
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }
);

export const EXAMPLE_SEARCH_HISTORIES: SearchHistoryType[] = [
  { id: 3, keyword: "Vue.js", createdOn: "2021-01-01T00:00:00.000Z" },
  { id: 2, keyword: "React", createdOn: "2021-02-01T00:00:00.000Z" },
  { id: 1, keyword: "JavaScript", createdOn: "2021-03-01T00:00:00.000Z" },
];
