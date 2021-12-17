import type { NextPage } from "next";
import { Layout } from "src/layout";
import { useUser, withUser } from "src/util/user";

import { ProfileForm } from "./ProfileForm";

const SettingQinUserNew: NextPage = () => {
  const { isLoading } = useUser();

  return (
    <Layout center="account">
      <div className="space-y-8">
        <h1 className="text-xl font-bold">プロフィール設定</h1>
        {isLoading ? null : <ProfileForm />}
      </div>
    </Layout>
  );
};

export default withUser(SettingQinUserNew);
