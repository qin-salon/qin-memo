import { useAuthUser } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";
import useSWRImmutable from "swr/immutable";

/**
 * @package
 */
export const useUser = () => {
  const authUser = useAuthUser();
  const {
    data: user,
    mutate: setUser,
    error,
    ...rest
  } = useSWRImmutable<UserType>(authUser.id ? `${API_URL}/users` : null);

  return {
    user,
    setUser,
    isLoading: !user && !error,
    error,
    ...rest,
  };
};
