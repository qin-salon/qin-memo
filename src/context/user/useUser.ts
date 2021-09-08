import { useAuthUser } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import useSWRImmutable from "swr/immutable";

import { getUser } from "./getUser";

/**
 * @package
 */
export const useUser = () => {
  const authUser = useAuthUser();
  const {
    data: user,
    mutate: setUser,
    ...rest
  } = useSWRImmutable(authUser.id ? `${API_URL}/users` : null, {
    fetcher: async (key) => {
      const user = await getUser(key, authUser);
      return user;
    },
  });

  return { user, setUser, ...rest };
};
