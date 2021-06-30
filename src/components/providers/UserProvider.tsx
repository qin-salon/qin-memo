import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { UserType } from "src/types/types";
import { SWRConfig } from "swr";

type ContextType = {
  user?: UserType;
  setUser?: Dispatch<SetStateAction<UserType | undefined>>;
};
const UserContext = createContext<ContextType>({});

const UserProvider: VFC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState<UserType | undefined>();
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
      const res = await fetch("/api/proxy/v1/users", {
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.status === 404) {
        const body = {
          uid: authUser.id,
          name: authUser.displayName,
          avatarUrl: authUser.photoURL,
        };
        const res = await fetch("/api/proxy/v1/users", {
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
        const res = await fetch(`/api/proxy/v1/users/${userData?.id}`, {
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
  }, [authUser, user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const withUser = (Component: NextPage) => {
  return withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(() => {
    return (
      <UserProvider>
        <SWRComponent>
          <Component />
        </SWRComponent>
      </UserProvider>
    );
  });
};

const SWRComponent: VFC<{ children: ReactNode }> = (props) => {
  const authUser = useAuthUser();

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const idToken = await authUser.getIdToken();
          return fetch(url, { headers: { authorization: `Bearer ${idToken}` } }).then((res) => {
            if (res.status === 200 || res.status === 201) {
              return res.json();
            }
            throw new Error();
          });
        },
      }}
    >
      {props.children}
    </SWRConfig>
  );
};
