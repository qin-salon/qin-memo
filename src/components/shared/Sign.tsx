import type { VFC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { QinMemoIcon } from "src/components/icon/QinMemoIcon";

type SignProps = { page: "signin" | "signup" };

export const Sign: VFC<SignProps> = (props) => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200">
      <div className="p-4">
        <div className="flex justify-center">
          <QinMemoIcon className="w-48" />
        </div>
        <div className="mt-20 space-y-5">
          <button className="flex justify-center items-center py-4 w-72 text-center bg-white rounded-full sm:w-80 hover:bg-opacity-80">
            <GoogleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
          </button>
          <button className="flex justify-center items-center py-4 w-72 text-center text-white bg-black rounded-full sm:w-80 hover:bg-opacity-80">
            <AppleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
