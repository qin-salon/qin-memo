import type { NextPage } from "next";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";

const SignUp: NextPage = () => {
  return (
    <div className="w-96 min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <div className="flex justify-center">
            <LogoIcon className="block" size="large" />
          </div>
          <div className="w-80 h-14 bg-white rounded-full relative">
            <div className="flex justify-around">
              <GoogleIcon size="large" />
              <p>Googleでアカウントを作成</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
