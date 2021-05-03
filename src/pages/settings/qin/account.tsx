import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Header } from "src/components/shared/Header";
import { List } from "src/components/shared/List";

const SettingsAccount: NextPage = () => {
  return (
    <div className="pb-20">
      <Header left="back" center="account" />

      <div className="mx-auto max-w-screen-sm">
        <h1 className="px-4 text-xl font-bold">アカウントの連携</h1>

        <div className="mt-4">
          <List
            items={[
              {
                label: (
                  <div className="flex items-center">
                    <GoogleIcon />
                    <div className="flex-1 ml-3 font-bold">Google</div>
                  </div>
                ),
                button: {
                  label: <div className="py-2 px-4 text-sm font-bold bg-gray-100 rounded-full">解除する</div>,
                  onClick: () => {
                    alert(123);
                  },
                },
              },
              {
                label: (
                  <div className="flex items-center">
                    <AppleIcon />
                    <div className="flex-1 ml-3 font-bold">Apple</div>
                  </div>
                ),
                button: {
                  label: (
                    <div className="py-2 px-4 text-sm font-bold text-white bg-blue-500 rounded-full">連携する</div>
                  ),
                  onClick: () => {
                    alert(123);
                  },
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
