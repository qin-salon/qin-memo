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
            <Button variant="solid-gray" className="py-2.5 px-5 mt-4">
              アイコンを{props.user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" />
        <Input name="id" label="ユーザー名" prefix="@" />
      </div>

      <div className="mt-12 space-y-4">
        {props.user ? (
          <Button variant="solid-blue" className="p-3 w-full">
            保存する
          </Button>
        ) : (
          <>
            <Button variant="solid-blue" className="p-3 w-full">
              登録してはじめる
            </Button>
            <Button variant="solid-gray" className="p-3 w-full">
              登録せずに終了する
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
