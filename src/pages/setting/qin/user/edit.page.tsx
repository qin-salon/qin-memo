import type { NextPage } from "next";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";
import { API_URL } from "src/api/endpoint";
import { isUserType } from "src/api/handler/user/type";
import { Layout } from "src/layout";
import { withUser } from "src/util/user";
import { SWRConfig } from "swr";

import { ProfileForm } from "./ProfileForm";

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.RENDER,
})(async (props) => {
  try {
    const idToken = await props.AuthUser.getIdToken();
    const USER_API_URL = `${API_URL}/users`;
    const res = await fetch(USER_API_URL, { headers: { authorization: `Bearer ${idToken}` } });
    if (!res.ok) throw new Error("User api request failed");
    const user = await res.json();
    if (!isUserType(user)) throw new Error("User not found");
    return { props: { fallback: { [USER_API_URL]: user } } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
});

const SettingQinUserEdit: NextPage<{ fallback: Record<string, unknown> }> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Layout left="back" center="account">
        <div className="space-y-8">
          <h1 className="text-xl font-bold">プロフィール設定</h1>
          <ProfileForm />
        </div>
      </Layout>
    </SWRConfig>
  );
};

export default withUser(SettingQinUserEdit);
