import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";

/**
 * @package
 */
export const useFetcher = () => {
  const authUser = useAuthUser();
  const fetcher = useCallback(
    async (url: string) => {
      const idToken = await authUser.getIdToken();
      const res = await fetch(url, { headers: { authorization: `Bearer ${idToken}` } });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error();
      }
      const json = await res.json();
      return json;
    },
    [authUser]
  );

  return fetcher;
};
