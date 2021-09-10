import { rest } from "msw";

const endpoint = `/api/signout`;

/**
 * @package ログアウト
 */
export const postApiSignout = rest.post(endpoint, (_req, res, ctx) => {
  return res(ctx.cookie("auth-token", ""));
});
