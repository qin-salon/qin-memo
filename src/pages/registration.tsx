import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";

const Registration: NextPage = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen">
      <div className="flex">
        <Button button id="backButton" bgColor="transparent" className="absolute left-2">
          <ChevronLeft />
        </Button>

        <p>アカウント</p>
      </div>
      <div className="w-screen h-screen flex flex-col justify-center">
        <div className="flex flex-row justify-between items-center w-88">
          <div className="w-24 flex flex-row justify-between">
            <GoogleIcon />
            <p>Google</p>
          </div>
          <Button button id="releaseRegistration" bgColor="gray" className="w-24">
            解除する
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center w-88">
          <div className="w-24 flex flex-row justify-between">
            <AppleIcon />
            <p>Apple</p>
          </div>
          <Button button id="linkRegistration" bgColor="blue" className="w-24">
            連携する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
