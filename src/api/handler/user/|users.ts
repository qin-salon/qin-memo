import { rest } from "msw";

import type { UserType } from "./type";

const endpoint = "/users";

/**
 * @package ユーザーを作成する
 */
export const postUsers = rest.post<string, UserType, never>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_USER_01));
});

const EXAMPLE_USER_01: UserType = {
  id: "qinta",
  name: "秦太",
  avatarUrl: "/mocks/avatar01.jpg",
  accountId: "qinta",
  enabledQinMemo: true,
};
