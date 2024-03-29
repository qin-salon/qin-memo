import type { NextPage } from "next";
import { Avatar } from "src/component/Avatar";
import { List } from "src/component/List";
import { Layout } from "src/layout";
import { useUser, withUser } from "src/util/user";

const SettingQin: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout left="close" center="account">
      <div className="flex flex-col items-center">
        <Avatar src={user?.avatarUrl} alt={user?.accountName} width={96} height={96} className="w-24 h-24" />
        <h1 className="mt-8 text-2xl font-bold">
          {user?.accountName ? `ようこそ、${user.accountName}さん` : "\u00A0"}
        </h1>
        <p className="mt-2 text-sm opacity-70">Qinアカウントに関する各種設定ができます</p>
      </div>

      <div className="mt-12">
        <List
          title="全般"
          items={[
            { label: "プロフィール", href: "/setting/qin/user/edit" },
            // いったんSNS連携機能は実装しないため、隠しておく
            // { label: "アカウントの連携", href: "/setting/qin/account" },
            { label: "データの削除", href: "/setting/qin/delete" },
          ]}
        />
      </div>
    </Layout>
  );
};

export default withUser(SettingQin);
