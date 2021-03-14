import Head from "next/head";
import type { VFC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { LogoIcon } from "src/components/icon/LogoIcon";
import { Button } from "src/components/share/Button";

const Signin: VFC = () => {
  // onClickイベントを渡さないとButtonコンポーネント側でlinkと
  // 判断されるため処理は何もしないけど、渡す
  const handleGoogleRegister = () => {
    return null;
  };
  const handleAppleRegister = () => {
    return null;
  };
  return (
    <div>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 w-screen h-screen">
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">
            <LogoIcon />
          </div>
          <Button
            type="button"
            id="googleButton"
            color="white"
            StartIcon={GoogleIcon}
            size="large"
            className="w-72"
            onClick={handleGoogleRegister}
            onKeyDown={handleGoogleRegister}
          >
            Googleでアカウント作成
          </Button>
          <Button
            type="button"
            id="appleButton"
            color="black"
            StartIcon={AppleIcon}
            size="large"
            className="w-72"
            onClick={handleAppleRegister}
            onKeyDown={handleAppleRegister}
          >
            Appleでアカウント作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
