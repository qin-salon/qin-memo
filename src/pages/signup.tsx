import type { NextPage } from "next";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";

const SignUp: NextPage = () => {
  return (
    <div className="w-96 min-h-screen bg-white">
      <div className="flex flex-col justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <LogoIcon size="large" />
        <div className="w-80 h-14 bg-white rounded-full relative">
          <div className="flex justify-around">
            <GoogleIcon size="large" />
            <p>Googleでアカウントを作成</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
