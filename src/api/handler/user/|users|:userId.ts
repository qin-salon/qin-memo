import { rest } from "msw";

import type { UserPutRequest, UserType } from "./type";

const endpoint = "/users/:userId";

/**
 * @package 特定のユーザーの情報を取得する
 */
export const getUsersUserId = rest.get<never, UserType, { userId: string }>(endpoint, (req, res, ctx) => {
  const { userId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_01, id: userId }));
});

/**
 * @package 特定のユーザー（自分）の情報を更新する
 */
export const putUsersUserId = rest.put<string, UserType, { userId: string }>(endpoint, (req, res, ctx) => {
  const { userId } = req.params;
  const body: UserPutRequest = JSON.parse(req.body);
  // eslint-disable-next-line no-console
  console.log({ サーバーが受け取ったリクエスト: body });
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_02, id: userId }));
});

const EXAMPLE_USER_01: UserType = {
  id: "qinta",
  name: "秦太",
  avatarUrl: "/mocks/avatar01.jpg",
  accountId: "qinta",
  enabledQinMemo: true,
};

export const EXAMPLE_USER_02: UserType = {
  id: "qinko",
  name: "秦子",
  avatarUrl: "/mocks/avatar02.jpg",
  accountId: "qinko",
  enabledQinMemo: true,
};
