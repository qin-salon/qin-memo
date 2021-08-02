import { useAuthUser } from "next-firebase-auth";
import { useCallback, useEffect } from "react";
import { API_URL } from "src/api/endpoint";
import { isUserType } from "src/api/handler/user/type";

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
      const res = await fetch(`${API_URL}/users`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.status === 404) {
        const body = {
          uid: authUser.id,
          name: authUser.displayName,
          avatarUrl: authUser.photoURL,
        };
        const res = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!isUserType(json)) {
          throw new Error("Failed to create user");
        }
        return setUser(json);
      }

      const userData = await res.json();
      if (!isUserType(userData)) {
        throw new Error("Failed to get user");
      }

      if (!userData.enabledQinMemo) {
        const body = { enabledQinMemo: true };
        const res = await fetch(`${API_URL}/users/${userData?.id}`, {
          method: "PUT",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!isUserType(json)) {
          throw new Error("Failed to enable qin memo");
        }
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
