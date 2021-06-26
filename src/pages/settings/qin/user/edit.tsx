import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { EXAMPLE_USER_01 } from "src/models/user";

const SettingsQinUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <div className="space-y-8">
        <h1 className="text-xl font-bold">プロフィール設定</h1>
        <ProfileForm user={EXAMPLE_USER_01} />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsQinUserEdit);
