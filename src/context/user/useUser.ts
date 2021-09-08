import type { AuthUserContext } from "next-firebase-auth";
import { useAuthUser } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import { isUserType } from "src/api/handler/user/type";
import useSWRImmutable from "swr/immutable";

const fetchUser = async (key: string, authUser: AuthUserContext) => {
  const idToken = await authUser.getIdToken();
  const res = await fetch(key, idToken ? { headers: { authorization: `Bearer ${idToken}` } } : undefined);

  if (res.status === 404) {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
      body: JSON.stringify({
        uid: authUser.id,
        accountName: authUser.displayName,
        avatarUrl: authUser.photoURL,
      }),
    });
    const data = await res.json();

    if (!isUserType(data)) {
      throw new Error("Failed to create user");
    }

    if (!data.enabledQinMemo) {
      await fetch(`${API_URL}/users/${data?.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ enabledQinMemo: true }),
      });
    }

    return data;
  }

  const data = await res.json();

  if (!isUserType(data)) {
    throw new Error("Failed to create user");
  }

  return data;
};

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
      const user = await fetchUser(key, authUser);
      return user;
    },
  });

  return { user, setUser, ...rest };
};
