import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithRedirect } from "firebase/auth";
import type { VFC } from "react";
import { Button } from "src/component/Button";
import { AppleIcon, GoogleIcon, QinMemoIcon } from "src/component/Icon";

type SignProps = { page: "signin" | "signup" };

const handleGoogleAuth = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, googleProvider);
};

const handleAppleAuth = () => {
  const provider = new OAuthProvider("apple.com");
  const auth = getAuth();
  signInWithRedirect(auth, provider);
};

export const Sign: VFC<SignProps> = (props) => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">
          <QinMemoIcon className="w-48" />
        </div>
        <div className="mt-20 space-y-5">
          <Button variant="solid-white" className="py-4 w-72 sm:w-80" onClick={handleGoogleAuth}>
            <div className="flex">
              <GoogleIcon className="mr-3 w-6 h-6" />
              <span>{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
            </div>
          </Button>
          <Button variant="solid-black" className="py-4 w-72 sm:w-80" onClick={handleAppleAuth}>
            <div className="flex">
              <AppleIcon className="mr-3 w-6 h-6" />
              <span>{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
