import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useState } from "react";
import type { UserType } from "src/types/types";

type ContextType = {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
};

/**
 * @package
 */
export const UserContext = createContext<ContextType | undefined>(undefined);

/**
 * @package
 */
export const UserProvider: VFC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState<UserType | undefined>();
  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
