import type { AuthUserContext } from "next-firebase-auth";
import { isUserType } from "src/api/handler/user/type";

import { createUser } from "./createUser";
import { enabledQinMemo } from "./enabledQinMemo";

/**
 * @package
 */
export const getUser = async (key: string, authUser: AuthUserContext) => {
  try {
    const idToken = await authUser.getIdToken();
    if (!idToken) {
      throw new Error("Failed to get id token");
    }

    const res = await fetch(key, { headers: { authorization: `Bearer ${idToken}` } });

    // ユーザーが作成されていない場合
    if (res.status === 404) {
      const user = await createUser(idToken, authUser);
      if (!user?.enabledQinMemo) {
        await enabledQinMemo(idToken, user);
      }
      return user;
    }

    // ユーザーが既に作成されている場合
    const data = await res.json();
    if (!isUserType(data)) {
      throw new Error("Failed to fetch user");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
