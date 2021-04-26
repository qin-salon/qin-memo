import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";
import { Button } from "src/components/shared/Button";

const SignUp: NextPage = () => {
  return (
    <div>
      <div className="w-screen h-screen bg-gray-200">
        <Button button bgColor="transparent" className="absolute left-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <div className="flex flex-col justify-center h-screen">
          <div className="flex justify-center mb-16">
            <LogoIcon />
          </div>
          <Button button bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-80">
            Googleでアカウントを作成
          </Button>
          <Button button bgColor="black" startIcon={<AppleIcon iconColor="white" />} size="large" className="w-80">
            Appleでアカウントを作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
