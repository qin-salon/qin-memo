import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_USER } from "./data";
import type { UserType } from "./type";

const endpoint = `${API_URL}/users`;

/**
 * @package 自分のユーザー情報を取得する
 */
export const getUsers = rest.get<string, never, UserType>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_USER));
});

/**
 * @package ユーザーを作成する
 */
export const postUsers = rest.post<string, never, UserType>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_USER));
});
