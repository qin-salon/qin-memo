import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Settings: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <ProfileForm user={user} />
    </Layout>
  );
};

export default Settings;
