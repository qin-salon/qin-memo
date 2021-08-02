import type { NextPage } from "next";
import { Layout } from "src/component/Layout";
import { RecursiveList } from "src/component/List";

const SettingsMemo: NextPage = () => {
  return (
    <Layout left="close" center="マイページ">
      <RecursiveList
        list={[
          {
            title: "設定",
            items: [{ label: "テーマ", href: "/setting/memo/theme" }],
          },
          {
            title: "サポート",
            items: [
              { label: "利用規約", href: "/setting/memo/terms" },
              { label: "プライバシーポリシー", href: "/setting/memo/privacy" },
              { label: "お問い合わせ", href: "https://forms.gle/pNNUdFnf3YmYpqhJ6" },
            ],
          },
        ]}
      />
    </Layout>
  );
};

export default SettingsMemo;
