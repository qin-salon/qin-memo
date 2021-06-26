import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const SettingsQin: NextPage = () => {
  return (
    <Layout left="close" center="account">
      <div className="flex flex-col items-center">
        <img src={user.avatarUrl} alt={user.name} className="overflow-hidden w-24 h-24 rounded-full" />
        <h1 className="mt-8 text-2xl font-bold">ようこそ、{user.name}さん</h1>
        <p className="mt-2 text-sm opacity-70">Qinアカウントに関する各種設定ができます</p>
      </div>

      <div className="mt-12">
        <List
          title="全般"
          items={[
            { label: "プロフィール", href: "/settings/qin/user/edit" },
            { label: "アカウントの連携", href: "/settings/qin/account" },
            { label: "データの削除", href: "/settings/qin/delete" },
          ]}
        />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsQin);
