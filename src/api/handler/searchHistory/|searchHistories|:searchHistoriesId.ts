import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

const endpoint = `${API_URL}/searchHistories/:searchHistoriesId`;

/**
 * @package 自分の特定の検索履歴を削除する
 */
export const deleteSearchHistoriesSearchHistoriesId = rest.delete<never, { searchHistoriesId: string }, undefined>(
  endpoint,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200));
  }
);
