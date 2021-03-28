import type { NextPage } from "next";
import { Button } from "src/components/shared/Button";
import { InputText, inputText } from "src/components/shared/InputText";

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="my-4 text-center text-xl font-bold">プロフィール設定</p>
      <div className="mb-8">
        <p className="py-2 text-gray-500">アイコン</p>
        <div className="flex justify-start items-center">
          <img src="https://placehold.jp/100x100.png" alt="" />
          <Button
            button
            id="iconChangeBtn"
            bgColor="gray"
            textColor="black"
            size="small"
            className="p-0.5 leading-4 text-xs ml-8"
          >
            変更する
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <p className="py-2 text-gray-500">名前</p>
        <InputText />
      </div>
      <div className="mb-8">
        <p className="py-2 text-gray-500">ユーザー名</p>
        <InputText />
        <p className="py-1 text-gray-500">https://qin.page/shimabu</p>
      </div>
      <Button button id="startBtn" className="w-full">
        登録してはじめる
      </Button>
      <Button button id="endBtn" bgColor="gray" textColor="black" className="w-full">
        登録せずに終了する
      </Button>
    </div>
  );
};

export default Settings;
