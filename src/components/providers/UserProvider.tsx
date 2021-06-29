import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { UserType } from "src/types/types";

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
      const json: UserType = await res.json();
      setUser(json);
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
        <Component />
      </UserProvider>
    );
  });
};
