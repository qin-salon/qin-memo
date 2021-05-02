import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";

const Privacy: NextPage = () => {
  return (
    <div>
      <Header page="setting" center="プライバシーポリシー" left="back" />
      <div className="mt-12 mx-auto max-w-screen-sm">内容</div>
    </div>
  );
};

export default Privacy;
