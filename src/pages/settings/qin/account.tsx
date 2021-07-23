import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { Button } from "src/components/shared/Button";
import { AppleIcon, GoogleIcon } from "src/components/shared/Icons";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";

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
                  <GoogleIcon className="w-6 h-6" />
                  <div className="flex-1 ml-3 font-bold">Google</div>
                </div>
              ),
              button: (
                <Button variant="solid-gray" className="py-2 px-4 text-sm" onClick={handleGoogle}>
                  解除する
                </Button>
              ),
            },
            {
              label: (
                <div className="flex items-center">
                  <AppleIcon className="w-6 h-6" />
                  <div className="flex-1 ml-3 font-bold">Apple</div>
                </div>
              ),
              button: (
                <Button variant="solid-blue" className="py-2 px-4 text-sm" onClick={handleApple}>
                  連携する
                </Button>
              ),
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SettingsQinAccount);
