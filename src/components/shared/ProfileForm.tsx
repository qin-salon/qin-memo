import { UserIcon } from "@heroicons/react/solid";
import type { VFC } from "react";
import { Button } from "src/components/shared/Button";
import { Input } from "src/components/shared/Input";
import type { UserType } from "src/types/types";

type ProfileFormProps = { user?: UserType };

export const ProfileForm: VFC<ProfileFormProps> = (props) => {
  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-start items-center space-x-6">
            {props.user ? (
              <img src={props.user.avatarUrl} alt={props.user.name} width={96} height={96} className="w-24 h-24" />
            ) : (
              <div className="p-2 w-24 h-24 bg-gray-300">
                <UserIcon className="text-white" />
              </div>
            )}
            <Button className="py-2.5 px-5 mt-4 w-max bg-gray-100 focus:bg-gray-200 dark:bg-gray-700 dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              アイコンを{props.user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" />
        <Input name="id" label="ユーザー名" prefix="@" />
      </div>

      <div className="mt-12 space-y-4">
        {props.user ? (
          <Button className="p-3 text-white bg-blue-500">保存する</Button>
        ) : (
          <>
            <Button className="p-3 text-white bg-blue-500">登録してはじめる</Button>
            <Button className="p-3 text-gray-800 bg-gray-100">登録せずに終了する</Button>
          </>
        )}
      </div>
    </div>
  );
};
