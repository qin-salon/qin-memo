import type { NextPage } from "next";
import { useCallback } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";
import { NewButton } from "src/components/shared/NewButton";

const SettingsQinAccount: NextPage = () => {
  const handleGoogle = useCallback(() => {
    alert("Google");
  }, []);
  const handleApple = useCallback(() => {
    alert("Apple");
  }, []);

  return (
    <Layout left="back" center="account">
      <h1 className="text-xl font-bold">アカウントの連携</h1>

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
              button: (
                <NewButton className="py-2 px-4 text-sm bg-gray-100" onClick={handleGoogle}>
                  解除する
                </NewButton>
              ),
            },
            {
              label: (
                <div className="flex items-center">
                  <AppleIcon />
                  <div className="flex-1 ml-3 font-bold">Apple</div>
                </div>
              ),
              button: (
                <NewButton className="py-2 px-4 text-sm text-white bg-blue-500" onClick={handleApple}>
                  解除する
                </NewButton>
              ),
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingsQinAccount;
