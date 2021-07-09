import type { NextPage } from "next";
import { withUser } from "src/components/providers/UserProvider";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";

const SettingsQinUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <div className="space-y-8">
        <h1 className="text-xl font-bold">プロフィール設定</h1>
        <ProfileForm />
      </div>
    </Layout>
  );
};

export default withUser(SettingsQinUserEdit);
