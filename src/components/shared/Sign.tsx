import type { VFC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { NewButton } from "src/components/shared/NewButton";

type SignProps = { page: "signin" | "signup" };

export const Sign: VFC<SignProps> = (props) => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200">
      <div className="p-4">
        <div className="flex justify-center">
          <QinMemoIcon className="w-48" />
        </div>
        <div className="mt-20 space-y-5">
          <NewButton className="py-4 w-72 bg-white sm:w-80">
            <GoogleIcon className="mr-3" />
            <span>{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
          </NewButton>
          <NewButton className="py-4 w-72 text-white bg-black sm:w-80">
            <AppleIcon className="mr-3" />
            <span>{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
          </NewButton>
        </div>
      </div>
    </div>
  );
};
