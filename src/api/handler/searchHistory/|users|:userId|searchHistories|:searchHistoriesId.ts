import { rest } from "msw";

const endpoint = "/users/:userId/searchHistories/:searchHistoriesId";

/**
 * @package 自分の特定の検索履歴を削除する
 */
export const deleteUsersUserIdSearchHistoriesSearchHistoriesId = rest.delete<
  never,
  { id: string },
  { userId: string; searchHistoriesId: string }
>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: "foo" }));
});
