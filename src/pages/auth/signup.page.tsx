import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";

import { Loader } from "./Loader";
import { Sign } from "./Sign";

const Signup: NextPage = () => {
  return <Sign page="signup" />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Signup);
