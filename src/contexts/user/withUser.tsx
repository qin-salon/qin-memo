import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { SWRConfig } from "swr";

import { useUserFetch } from "./useUserFetch";

const useFetcher = () => {
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

/**
 * @package
 */
export const withUser = (Component: NextPage<any>) => {
  return withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })((props) => {
    useUserFetch();
    const fetcher = useFetcher();
    return (
      <SWRConfig value={{ fetcher }}>
        <Component {...props} />
      </SWRConfig>
    );
  });
};
