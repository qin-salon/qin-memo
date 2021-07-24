import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";

import { SWRProvider } from "./SWRProvider";
import { UserFetcher } from "./UserFetcher";

/**
 * @package
 */
export const withUser = (Component: NextPage) => {
  return withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })((props) => {
    return (
      <UserFetcher>
        <SWRProvider>
          <Component {...props} />
        </SWRProvider>
      </UserFetcher>
    );
  });
};
