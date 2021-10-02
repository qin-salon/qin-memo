import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Avatar } from "src/component/Avatar";
import { Button } from "src/component/Button";
import { Input } from "src/component/Form";
import { useUser } from "src/util/user";

import { useFile } from "./useFile";
import { useUpsertUser } from "./useUpsertUser";

export type UserForm = { accountName: string; userName: string };

type ProfileFormProps = { accountName?: string; userName?: string };

/**
 * @package
 */
export const ProfileForm: VFC<ProfileFormProps> = () => {
  const authUser = useAuthUser();
  const handleSignOut = useCallback(() => {
    return authUser.signOut();
  }, [authUser]);
  const { user } = useUser();
  const { selectedFile, imageUrl, imageRef, handleChangeFile, handleOpenFileDialog } = useFile();
  const { isUpserting, upsertUser } = useUpsertUser(selectedFile);
  const { register, handleSubmit, formState } = useForm<UserForm>({
    defaultValues: {
      accountName: user?.accountName ?? authUser.displayName ?? "",
      userName: user?.userName ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(upsertUser)}>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-start items-center space-x-6">
            <Avatar
              noDialog
              src={imageUrl ?? user?.avatarUrl ?? authUser.photoURL ?? ""}
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

        <Input
          label="名前"
          {...register("accountName", {
            required: { value: true, message: "入力必須です" },
            maxLength: { value: 64, message: "64文字以下にする必要があります" },
            minLength: { value: 2, message: "2文字以上にする必要があります" },
          })}
          error={formState.errors.accountName?.message}
        />

        <Input
          label="ユーザー名"
          prefix="@"
          {...register("userName", {
            required: { value: true, message: "入力必須です" },
            maxLength: { value: 16, message: "16文字以下にする必要があります" },
            minLength: { value: 4, message: "4文字以上にする必要があります" },
            pattern: { value: /^[A-Za-z0-9_]+$/i, message: "半角英数字と_だけご使用できます" },
          })}
          error={formState.errors.userName?.message}
        />
      </div>

      <div className="mt-12 space-y-4">
        {user ? (
          <Button type="submit" variant="solid-blue" className="p-3 w-full" disabled={isUpserting}>
            保存する
          </Button>
        ) : (
          <>
            <Button type="submit" variant="solid-blue" className="p-3 w-full" disabled={isUpserting}>
              登録してはじめる
            </Button>
            <Button variant="solid-gray" className="p-3 w-full" onClick={handleSignOut}>
              登録せずに終了する
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
