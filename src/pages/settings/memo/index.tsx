import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";
import { RecursiveList } from "src/components/shared/List";

const SettingsMemo: NextPage = () => {
  return (
    <div>
      <Header page="setting" center="マイページ" left="close" />

      <div className="mt-12 mx-auto max-w-screen-sm">
        <RecursiveList
          list={[
            {
              title: "設定",
              items: [{ label: "テーマ", href: "/settings/memo/theme" }],
            },
            {
              title: "サポート",
              items: [
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
                { label: "お問い合わせ", href: "/contact" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SettingsMemo;
