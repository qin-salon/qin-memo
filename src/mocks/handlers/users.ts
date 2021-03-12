import { rest } from "msw";
import type { User, UserPutRequest } from "src/models/user";
import { EXAMPLE_USER_01, EXAMPLE_USER_02 } from "src/models/user";

export const usersHandlers = [
  // ユーザーを作成する
  rest.post<string, User, never>("/users", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_USER_01));
  }),

  // 特定のユーザーの情報を取得する
  rest.get<never, User, { userId: string }>("/users/:userId", (req, res, ctx) => {
    const { userId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_01, id: userId }));
  }),

  // 特定のユーザー（自分）の情報を更新する
  rest.put<string, User, { userId: string }>("/users/:userId", (req, res, ctx) => {
    const { userId } = req.params;
    const body: UserPutRequest = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log({ サーバーが受け取ったリクエスト: body });
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_02, id: userId }));
  }),
];
