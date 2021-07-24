import type { NextPage } from "next";
import { Layout } from "src/components/shared/Layout";
import { RecursiveList } from "src/components/shared/Lists";

const SettingsMemo: NextPage = () => {
  return (
    <Layout left="close" center="マイページ">
      <RecursiveList
        list={[
          {
            title: "設定",
            items: [{ label: "テーマ", href: "/settings/memo/theme" }],
          },
          {
            title: "サポート",
            items: [
              { label: "利用規約", href: "/settings/memo/terms" },
              { label: "プライバシーポリシー", href: "/settings/memo/privacy" },
              { label: "お問い合わせ", href: "https://forms.gle/pNNUdFnf3YmYpqhJ6" },
            ],
          },
        ]}
      />
    </Layout>
  );
};

export default SettingsMemo;
