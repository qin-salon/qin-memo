import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";
import { RecursiveList } from "src/components/shared/List";

const SettingsMemo: NextPage = () => {
  return (
    <div>
      <Header left="close" center="マイページ" />

      <div className="mx-auto max-w-screen-sm sm:mt-4">
        <RecursiveList
          list={[
            {
              title: "設定",
              items: [{ label: "テーマ", href: "/settings/memo/theme" }],
            },
            {
              title: "サポート",
              items: [
                { label: "利用規約", href: "/terms" },
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "お問い合わせ", href: "https://forms.gle/pNNUdFnf3YmYpqhJ6" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SettingsMemo;
