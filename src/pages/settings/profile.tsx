import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "src/components/shared/Button";
import { ProfileSetting } from "src/components/shared/ProfileSetting";

const Settings: NextPage = () => {
  return (
    <div className="p-4 mx-auto max-w-screen-sm">
      <p className="flex relative items-center my-4">
        <Link href="/">
          <a className="absolute left-1">
            <ChevronLeftIcon className="w-5 h-5" />
          </a>
        </Link>
        <span className="block w-full text-xl font-bold text-center">プロフィール設定</span>
      </p>
      <ProfileSetting />
      <Button button className="mt-8 w-full">
        保存する
      </Button>
    </div>
  );
};

export default Settings;
