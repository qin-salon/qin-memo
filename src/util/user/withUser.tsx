import type { NextPage } from "next";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { SWRConfig } from "swr";

export const useFetcher = () => {
  const authUser = useAuthUser();
  const fetcher = useCallback(
    async (key: string) => {
      const idToken = await authUser.getIdToken();
      const res = await fetch(key, { headers: { authorization: `Bearer ${idToken}` } });
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
export const withUser = (Component: NextPage<any>, options?: Record<string, unknown>) => {
  return withAuthUser(
    options
      ? options
      : { whenUnauthedBeforeInit: AuthAction.SHOW_LOADER, whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN }
  )((props) => {
    const fetcher = useFetcher();
    return (
      <SWRConfig value={{ fetcher }}>
        <Component {...props} />
      </SWRConfig>
    );
  });
};
