import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_USER, EXAMPLE_USER_1 } from "./data";
import type { UserType } from "./type";

const endpoint = `${API_URL}/users/:userId`;

/**
 * @package 特定のユーザーの情報を取得する
 */
export const getUsersUserId = rest.get<never, { userId: string }, UserType>(endpoint, (req, res, ctx) => {
  const { userId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER, id: userId }));
});

/**
 * @package 特定のユーザー（自分）の情報を更新する
 */
export const putUsersUserId = rest.put<string, { userId: string }, UserType>(endpoint, (req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_USER_1));
});
