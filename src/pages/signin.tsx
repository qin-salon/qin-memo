import type { VFC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";
import { Button } from "src/components/shared/Button";

const Signin: VFC = () => {
  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen">
        <Button button id="backButton" bgColor="transparent" className="absolute left-2">
          <ChevronLeft />
        </Button>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">
            <LogoIcon />
          </div>
          <Button button id="googleButton" bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-72">
            Googleでアカウント作成
          </Button>
          <Button button id="appleButton" bgColor="black" startIcon={<AppleIcon />} size="large" className="w-72">
            Appleでアカウント作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
