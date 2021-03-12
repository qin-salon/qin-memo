import { rest } from "msw";
import { EXAMPLE_SEARCH_HISTORIES } from "src/models/searchHistory";

export const searchHistoriesHandlers = [
  rest.get("/users/:userId/searchHistories", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES));
  }),
  rest.post("/users/:userId/searchHistories", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json({}));
  }),
  rest.delete("/users/:userId/searchHistories", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json({}));
  }),
];
