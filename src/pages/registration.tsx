import type { NextPage } from "next";
import { Button } from "src/components/shared/Button";
import { ProfileSetting } from "src/components/shared/ProfileSetting";

const Registration: NextPage = () => {
  return (
    <div className="p-4 mx-auto max-w-screen-sm">
      <p className="my-4 text-xl font-bold text-center">プロフィール設定</p>
      <ProfileSetting />
      <Button button className="mt-8 w-full">
        登録してはじめる
      </Button>
      <Button button bgColor="gray" textColor="black" className="w-full">
        登録せずに終了する
      </Button>
    </div>
  );
};

export default Registration;
