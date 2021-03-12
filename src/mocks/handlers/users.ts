import { rest } from "msw";
import { EXAMPLE_OTHER_USER_NOTE_LIST } from "src/models/note";
import type { User, UserPutRequest } from "src/models/user";
import { EXAMPLE_USER_01, EXAMPLE_USER_02 } from "src/models/user";

export const usersHandlers = [
  rest.post("/users", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200));
  }),
  rest.get("/users/:userId", (req, res, ctx) => {
    const { userId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_01, id: userId }));
  }),
  rest.put<string, User, { userId: string }>("/users/:userId", (req, res, ctx) => {
    const { userId } = req.params;
    const body: UserPutRequest = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log({ サーバーが受け取ったリクエスト: body });
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_02, id: userId }));
  }),
  rest.get("/users/:userId/notes", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_OTHER_USER_NOTE_LIST));
  }),
  rest.get("/users/:userId/notes/search", (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json([EXAMPLE_OTHER_USER_NOTE_LIST[1], EXAMPLE_OTHER_USER_NOTE_LIST[2]])
    );
  }),
];
