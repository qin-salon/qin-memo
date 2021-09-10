import type { VFC } from "react";
import { Avatar } from "src/component/Avatar";
import { Button } from "src/component/Button";
import { Input } from "src/component/Form";
import { useUser } from "src/util/user";

import { useProfileForm } from "./useProfileForm";

/**
 * @package
 */
export const ProfileForm: VFC = () => {
  const { user } = useUser();
  const {
    isLoading,
    imageUrl,
    userNameRef,
    accountNameRef,
    imageRef,
    handleChangeFile,
    handleSave,
    handleOpenFileDialog,
  } = useProfileForm();

  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-start items-center space-x-6">
            <Avatar
              noDialog
              src={imageUrl ?? user?.avatarUrl}
              alt={user?.accountName}
              width={96}
              height={96}
              className="overflow-hidden w-24 h-24 rounded-full"
            />
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={handleChangeFile}
              accept="image/png, image/jpeg"
            />
            <Button variant="solid-gray" className="py-2.5 px-5 mt-4" onClick={handleOpenFileDialog}>
              アイコンを{user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="accountName" label="名前" defaultValue={user?.accountName} ref={accountNameRef} />
        <Input name="userName" label="ユーザー名" prefix="@" defaultValue={user?.userName} ref={userNameRef} />
      </div>

      <div className="mt-12 space-y-4">
        {user ? (
          <Button variant="solid-blue" className="p-3 w-full" onClick={handleSave} disabled={isLoading}>
            保存する
          </Button>
        ) : (
          <>
            <Button variant="solid-blue" className="p-3 w-full" disabled={isLoading}>
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
