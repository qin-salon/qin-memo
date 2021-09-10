import type { GetServerSideProps, NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useCallback } from "react";
import { Button } from "src/component/Button";
import { AppleIcon, GoogleIcon } from "src/component/Icon";
import { List } from "src/component/List";
import { Layout } from "src/layout";

// いったんSNS連携機能は実装しないため、404にしておく
export const getServerSideProps: GetServerSideProps = async () => {
  return { notFound: true };
};

const SettingQinAccount: NextPage = () => {
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
})(SettingQinAccount);
