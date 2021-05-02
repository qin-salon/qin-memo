import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";

const Contact: NextPage = () => {
  return (
    <div>
      <Header page="setting" center="お問い合わせ" left="back" />
      <div className="mt-12 mx-auto max-w-screen-sm">内容</div>
    </div>
  );
};

export default Contact;
