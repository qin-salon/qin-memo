import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinAccount } from "src/components/icon/QinAccount";
import { Button } from "src/components/shared/Button";

const SettingsAccount: NextPage = () => {
  return (
    <div className="bg-white h-screen flex justify-center px-5 text-black">
      <div className="w-80">
        <div className="relative flex justify-center mb-6 py-3">
          <Button button bgColor="transparent" className="absolute left-0 top-0 mx-0 my-0 px-0 py-3.5">
            <ChevronLeft />
          </Button>
          <QinAccount />
        </div>
        <h2 className="font-bold mb-10 text-2xl">アカウントの連携</h2>
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
