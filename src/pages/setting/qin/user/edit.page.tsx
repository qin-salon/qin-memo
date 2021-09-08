import type { NextPage } from "next";
import { Layout } from "src/layout";
import { withUser } from "src/util/user";

import { ProfileForm } from "./ProfileForm";

const SettingQinUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <div className="space-y-8">
        <h1 className="text-xl font-bold">プロフィール設定</h1>
        <ProfileForm />
      </div>
    </Layout>
  );
};

export default withUser(SettingQinUserEdit);
