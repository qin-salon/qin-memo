import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";

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

export default SettingsQinUserNew;
