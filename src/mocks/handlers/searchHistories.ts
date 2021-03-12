import { rest } from "msw";
import type { SearchHistory } from "src/models/searchHistory";
import { EXAMPLE_SEARCH_HISTORIES } from "src/models/searchHistory";

export const searchHistoriesHandlers = [
  // 自分の検索履歴を表示する
  rest.get<never, SearchHistory[], { userId: string }>("/users/:userId/searchHistories", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES));
  }),

  // 自分の検索履歴に追加する
  rest.post<string, { id: string }, { userId: string }>("/users/:userId/searchHistories", (req, res, ctx) => {
    const body: Pick<SearchHistory, "keyword"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body.keyword);
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }),

  // 自分の特定の検索履歴を削除する
  rest.delete<never, { id: string }, { userId: string; searchHistoriesId: string }>(
    "/users/:userId/searchHistories/:searchHistoriesId",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: "foo" }));
    }
  ),
];
