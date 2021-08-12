import type { NextPage } from "next";
import { Avatar } from "src/component/Avatar";
import { List } from "src/component/List";
import { useUser, withUser } from "src/context/user";
import { Layout } from "src/layout";

const SettingsQin: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout left="close" center="account">
      <div className="flex flex-col items-center">
        <Avatar
          src={user?.avatarUrl}
          alt={user?.accountName}
          width={96}
          height={96}
          className="overflow-hidden w-24 h-24 rounded-full"
        />
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
            { label: "アカウントの連携", href: "/setting/qin/account" },
            { label: "データの削除", href: "/setting/qin/delete" },
          ]}
        />
      </div>
    </Layout>
  );
};

export default withUser(SettingsQin);
