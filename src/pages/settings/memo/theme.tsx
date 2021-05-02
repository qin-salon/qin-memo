import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";

const SettingsMemoTheme: NextPage = () => {
  return (
    <div>
      <Header page="setting" center="テーマ" left="back" />
      <div className="mt-12 mx-auto max-w-screen-sm">内容</div>
    </div>
  );
};

export default SettingsMemoTheme;
