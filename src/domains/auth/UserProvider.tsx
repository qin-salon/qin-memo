import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useContext, useState } from "react";
import type { UserType } from "src/types/types";

type ContextType = {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
};

const UserContext = createContext<ContextType | undefined>(undefined);

/**
 * @package
 */
export const UserProvider: VFC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState<UserType | undefined>();
  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

/**
 * @package
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
