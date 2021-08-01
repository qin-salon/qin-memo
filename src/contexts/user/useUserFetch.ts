import { useAuthUser } from "next-firebase-auth";
import { useCallback, useEffect } from "react";
import type { UserType } from "src/api/handler/user/type";
import { API_URL } from "src/utils/constants";

import { useUser } from "./useUser";

/**
 * @package
 */
export const useUserFetch = () => {
  const { user, setUser } = useUser();
  const authUser = useAuthUser();

  const fetchUser = useCallback(async () => {
    try {
      if (!authUser.id) {
        return setUser(undefined);
      }

      if (user) {
        return;
      }

      const token = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/v1/users`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.status === 404) {
        const body = {
          uid: authUser.id,
          name: authUser.displayName,
          avatarUrl: authUser.photoURL,
        };
        const res = await fetch(`${API_URL}/v1/users`, {
          method: "POST",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        // TODO: ここはtypeguard
        const json: UserType = await res.json();
        return setUser(json);
      }

      // TODO: ここはtypeguard
      const userData: UserType = await res.json();

      if (!userData.enabledQinMemo) {
        const body = { enabledQinMemo: true };
        const res = await fetch(`${API_URL}/v1/users/${userData?.id}`, {
          method: "PUT",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const json: UserType = await res.json();
        return setUser(json);
      }

      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }, [authUser, setUser, user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};
