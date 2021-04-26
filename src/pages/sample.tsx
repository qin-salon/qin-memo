import { SearchIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "src/components/layout";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";

const ButtonPage: NextPage = () => {
  const [count, setCount] = useState(0);

  const handleAddCount = () => {
    setCount((preCount) => {
      return preCount + 1;
    });
  };

  return (
    <Layout>
      <h2 className="text-gray-800 dark:text-white">
        使い回せるボタンのコンポーネントを @takasaki376
        さんが作ってくれました。もし必要であればこちらのコンポーネントを使いまわしてください！
      </h2>
      <div className="flex flex-col">
        <div className="my-4 ml-4">
          <span className="m-auto">ボタンクリック テスト用のカウント：{count}</span>
        </div>
        <div className="flex flex-row flex-none justify-start">
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount}>
              メモを書く
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount} disabled>
              メモを書く
            </Button>
          </div>

          <div className="mx-auto">
            <Button button bgColor="gray" onClick={handleAddCount}>
              キャンセル
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount} disabled>
              キャンセル
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="mx-auto">
            <Button button bgColor="red" className="w-32" onClick={handleAddCount}>
              削除する
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="red" className="w-32" onClick={handleAddCount} disabled>
              削除する
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="transparent" textColor="blue" onClick={handleAddCount}>
              プロフィール設定
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="transparent" textColor="blue" onClick={handleAddCount} disabled>
              プロフィール設定
            </Button>
          </div>
          <div className="mx-auto">
            <Button linkProps={{ href: "/signin" }}>サインイン</Button>
          </div>
          <div className="mx-auto">
            <Button linkProps={{ href: "/signin" }} disabled>
              サインイン
            </Button>
          </div>
        </div>

        <div className="my-4 ml-4">
          <span className="m-auto">アバターの表示</span>
        </div>
        <div className="flex flex-row flex-none justify-start">
          <div className="mx-auto">
            <Avatar alt="特大" src="/mocks/avatar01.jpg" size="extralarge" />
          </div>
          <div className="mx-auto">
            <Avatar alt="大" src="/mocks/avatar01.jpg" size="large" />
          </div>
          <div className="mx-auto">
            <Avatar alt="中" src="/mocks/avatar01.jpg" size="medium" />
          </div>
          <div className="mx-auto">
            <Avatar alt="小" src="/mocks/avatar01.jpg" size="small" />
          </div>
        </div>
        <div className="flex flex-row flex-none justify-start">
          <div className="mx-auto">
            <Avatar alt="特大" src="" size="extralarge" />
          </div>
          <div className="mx-auto">
            <Avatar alt="大" size="large" />
          </div>
          <div className="mx-auto">
            <Avatar alt="中" src={null} size="medium" />
          </div>
          <div className="mx-auto">
            <Avatar alt="小" src={undefined} size="small" />
          </div>
        </div>
        <div className="my-4 ml-4">
          <span className="m-auto">テキストボックスの表示</span>
        </div>
        <div className="flex flex-row flex-none justify-start mt-4">
          <div className="mx-auto">
            <InputText startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6" />} placeholder="メモを検索する" />
          </div>
          <div className="mx-auto">
            <InputText label="ユーザ名" bgColor="white" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ButtonPage;
