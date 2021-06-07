import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Sign } from "src/components/shared/Sign";

const Signin: NextPage = () => {
  return <Sign page="signin" />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Signin);
