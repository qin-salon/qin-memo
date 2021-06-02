import type { VFC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";
import { Button } from "src/components/shared/Button";

type SignProps = { page: "signin" | "signup" };

export const Sign: VFC<SignProps> = (props) => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">
          <QinMemoIcon className="w-48" />
        </div>
        <div className="mt-20 space-y-5">
          <Button variant="solid-white" className="py-4 w-72 sm:w-80">
            <div className="flex">
              <GoogleIcon className="mr-3" />
              <span>{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
            </div>
          </Button>
          <Button variant="solid-black" className="py-4 w-72 sm:w-80">
            <div className="flex">
              <AppleIcon className="mr-3" />
              <span>{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
