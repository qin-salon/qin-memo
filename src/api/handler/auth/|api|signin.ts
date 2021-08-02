import { rest } from "msw";

const endpoint = `/api/signin`;

/**
 * @package ログイン
 */
export const postApiSignin = rest.post(endpoint, (_req, res, ctx) => {
  return res(ctx.cookie("auth-token", "abc-123"));
});
