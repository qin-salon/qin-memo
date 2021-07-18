import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { PageLoader } from "src/components/PageLoader";
import { Sign } from "src/components/shared/Sign";

const Signin: NextPage = () => {
  return <Sign page="signin" />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: PageLoader,
})(Signin);
