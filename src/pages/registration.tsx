import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";

const Registration: NextPage = () => {
  return (
    <Layout center="account">
      <ProfileForm />
    </Layout>
  );
};

export default Registration;
