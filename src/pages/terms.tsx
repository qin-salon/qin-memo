import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";

const Terms: NextPage = () => {
  return (
    <div>
      <Header page="setting" center="利用規約" left="back" />
      <div className="mt-12 mx-auto max-w-screen-sm">内容</div>
    </div>
  );
};

export default Terms;
