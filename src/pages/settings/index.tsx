import type { NextPage } from "next";
import { Button } from "src/components/shared/Button";
import { ProfileSetting } from "src/components/shared/ProfileSetting";

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="my-4 text-center text-xl font-bold">プロフィール設定</p>
      <ProfileSetting />
      <Button button className="w-full">
        保存する
      </Button>
    </div>
  );
};

export default Settings;
