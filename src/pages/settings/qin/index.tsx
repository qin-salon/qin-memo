import type { NextPage } from "next";
import { useUser, withUser } from "src/components/providers/UserProvider";
import { Avatar } from "src/components/shared/Avatar";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";

const SettingsQin: NextPage = () => {
  const { user } = useUser();
  return (
    <Layout left="close" center="account">
      <div className="flex flex-col items-center">
        <Avatar
          src={user?.avatarUrl}
          alt={user?.name}
          width={96}
          height={96}
          className="overflow-hidden w-24 h-24 rounded-full"
        />
        <h1 className="mt-8 text-2xl font-bold">ようこそ、{user?.name}さん</h1>
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

export default withUser(SettingsQin);
