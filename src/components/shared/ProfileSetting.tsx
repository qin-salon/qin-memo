import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";

export const ProfileSetting = () => {
  return (
    <div>
      <div>
        <p className="py-2 text-gray-500">アイコン</p>
        <div className="flex justify-start items-center">
          <img src="https://placehold.jp/100x100.png" alt="" />
          <Button button bgColor="gray" textColor="black" size="small" className="p-0.5 leading-4 text-xs ml-8">
            変更する
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <p className="py-2 text-gray-500">名前</p>
        <InputText />
      </div>
      <div className="mt-4">
        <p className="py-2 text-gray-500">ユーザー名</p>
        <InputText />
        <p className="py-1 text-gray-500">https://qin.page/shimabu</p>
      </div>
    </div>
  );
};
