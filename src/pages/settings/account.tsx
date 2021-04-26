import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinAccount } from "src/components/icon/QinAccount";
import { Button } from "src/components/shared/Button";

const SettingsAccount: NextPage = () => {
  return (
    <div className="flex justify-center px-5 h-screen text-black bg-white">
      <div className="w-80">
        <div className="flex relative justify-center py-3 mb-6">
          <Button button bgColor="transparent" className="absolute left-0 top-0 mx-0 my-0 px-0 py-3.5">
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <QinAccount />
        </div>
        <h2 className="mb-10 text-2xl font-bold">アカウントの連携</h2>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <GoogleIcon />
            <p className="ml-3 font-bold">Google</p>
          </div>
          <Button button bgColor="gray" className="my-0 mx-0 text-xs">
            解除する
          </Button>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <AppleIcon iconColor="black" />
            <p className="ml-3 font-bold">Apple</p>
          </div>
          <Button button bgColor="blue" className="my-0 mx-0 text-xs">
            連携する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
