import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useCallback, useEffect } from "react";
import type { UserType } from "src/types/types";
import { API_URL } from "src/utils/constants";

import { SWRProvider } from "./SWRProvider";
import { useUser } from "./UserProvider";

const UserFetcher: VFC<{ children: JSX.Element }> = (props) => {
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

  return props.children;
};

export const withUser = (Component: NextPage) => {
  return withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })((props) => {
    return (
      <UserFetcher>
        <SWRProvider>
          <Component {...props} />
        </SWRProvider>
      </UserFetcher>
    );
  });
};
