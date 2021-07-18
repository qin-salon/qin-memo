import { useAuthUser } from "next-firebase-auth";
import type { ReactNode, VFC } from "react";
import { useCallback } from "react";
import { SWRConfig } from "swr";

export const SWRProvider: VFC<{ children: ReactNode }> = (props) => {
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

  return <SWRConfig value={{ fetcher }}>{props.children}</SWRConfig>;
};
