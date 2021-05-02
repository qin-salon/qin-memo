import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Header } from "src/components/shared/Header";

const SettingsAccount: NextPage = () => {
  return (
    <div className="pb-20">
      <Header page="setting" left="back" />

      <div className="px-4 mx-auto max-w-screen-sm">
        <h1 className="text-xl font-bold">アカウントの連携</h1>

        <ul className="mt-8 space-y-4">
          <li className="flex justify-between items-center">
            <GoogleIcon />
            <div className="flex-1 ml-3 font-bold">Google</div>
            <button className="py-2 px-4 text-sm font-bold bg-gray-100 rounded-full">解除する</button>
          </li>
          <li className="flex justify-between items-center">
            <AppleIcon />
            <div className="flex-1 ml-3 font-bold">Apple</div>
            <button className="py-2 px-4 text-sm font-bold text-white bg-blue-500 rounded-full">連携する</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsAccount;
