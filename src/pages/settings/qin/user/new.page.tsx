import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Layout } from "src/component/Layout";

import { ProfileForm } from "./ProfileForm";

const SettingsQinUserNew: NextPage = () => {
  return (
    <Layout center="account">
      <div className="space-y-8">
        <h1 className="text-xl font-bold">プロフィール設定</h1>
        <ProfileForm />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsQinUserNew);
