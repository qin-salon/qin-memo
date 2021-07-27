import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useFetcher } from "src/contexts/fetcher";
import { SWRConfig } from "swr";

import { useUserFetch } from "./useUserFetch";

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
