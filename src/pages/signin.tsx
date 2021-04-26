import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Button } from "src/components/shared/Button";

const Signin: NextPage = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-gray-200">
        <Button button bgColor="transparent" className="absolute left-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center mb-16">
            <QinMemoIcon className="w-48" />
          </div>
          <Button button bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-72">
            Googleでログイン
          </Button>
          <Button button bgColor="black" startIcon={<AppleIcon iconColor="white" />} size="large" className="w-72">
            Appleでログイン
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
