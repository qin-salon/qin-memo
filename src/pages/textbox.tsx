import type { NextPage } from "next";
import { useState } from "react";
import { BasicTextBox } from "src/components/input/BasicTextBox";
import { Layout } from "src/components/layout";

const TextBoxPage: NextPage = () => {
  const [text, setText] = useState("");

  const handleAddText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (text !== newValue) {
      setText(newValue);
    }
  };

  return (
    <Layout>
      <h2 className="text-gray-800 dark:text-white">
        テキストボックスコンポーネント 動作試験用のページです！
      </h2>
      <div className="flex flex-col">
        <div className="my-4 ml-4">
          <span className="m-auto">テキストボックス テスト用の入力値：{text}</span>
        </div>
        <div className="my-4 ml-4">
          <BasicTextBox startIcon={<span>▲</span>} endIcon={<span>★</span>} value={text} onChange={handleAddText} />
        </div>
        <div className="flex flex-row justify-start flex-wrap flex-none">
          <div className="mx-auto">
            <BasicTextBox placeholder="none" type="text" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox type="text" size="small" placeholder="small" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox type="text" size="middle" placeholder="middle" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox type="text" size="large" placeholder="large" value={text} onChange={handleAddText} />
          </div>
        </div>
        <div className="flex flex-row justify-start flex-wrap flex-none">
          <div className="mx-auto">
            <BasicTextBox placeholder="none" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox size="small" placeholder="small" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox size="middle" placeholder="middle" value={text} onChange={handleAddText} />
          </div>
          <div className="mx-auto">
            <BasicTextBox size="large" placeholder="large" value={text} onChange={handleAddText} />
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default TextBoxPage;
