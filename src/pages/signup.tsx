import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";
import { Button } from "src/components/shared/Button";

const SignUp: NextPage = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen ">
      <Button button id="backButton" bgColor="transparent" className="absolute left-2">
        <ChevronLeft />
      </Button>
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center mb-16">
          <LogoIcon />
        </div>
        <Button button id="googleButton" bgColor="white" startIcon={<GoogleIcon />} className="w-80" size="large">
          Googleでアカウントを作成
        </Button>
        <Button button id="appleButton" bgColor="black" startIcon={<AppleIcon />} className="w-80" size="large">
          Appleでアカウントを作成
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
