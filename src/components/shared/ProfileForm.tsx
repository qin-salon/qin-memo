import "firebase/storage";

import firebase from "firebase/app";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent, VFC } from "react";
import { useCallback, useRef, useState } from "react";
import { useUser } from "src/components/providers/UserProvider";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { Input } from "src/components/shared/Input";
import { API_URL } from "src/utils/constants";

const createAvatarUrl = (userId?: string) => {
  if (!userId) return;
  const filePath = encodeURIComponent(`thumbnails/${userId}_200x200`);
  return `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}/${filePath}?alt=media`;
};

export const ProfileForm: VFC = () => {
  // TODO: ここhooksにまとめたい
  const authUser = useAuthUser();
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const nameRef = useRef<HTMLInputElement>(null);
  const accountIdRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const handleOpenFileDialog = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0);
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!nameRef.current?.value || !accountIdRef.current?.value) {
        return;
      }
      if (selectedFile) {
        await firebase.storage().ref(user?.id).put(selectedFile);
      }
      const idToken = await authUser.getIdToken();
      const body = {
        name: nameRef.current.value,
        accountId: accountIdRef.current?.value,
        avatarUrl: createAvatarUrl(user?.id),
      };
      await fetch(`${API_URL}/v1/users/${user?.id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  }, [authUser, selectedFile, user?.id]);

  // TOOD: アイコンの設定がまだ
  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex justify-start items-center space-x-6">
            <Avatar
              noDialog
              src={imageUrl ?? user?.avatarUrl}
              alt={user?.name}
              width={96}
              height={96}
              className="overflow-hidden w-24 h-24 rounded-full"
            />
            <input ref={imageRef} type="file" className="hidden" onChange={handleFileChange} />
            <Button variant="solid-gray" className="py-2.5 px-5 mt-4" onClick={handleOpenFileDialog}>
              アイコンを{user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" defaultValue={user?.name} ref={nameRef} />
        <Input name="accountId" label="ユーザー名" prefix="@" defaultValue={user?.accountId} ref={accountIdRef} />
      </div>

      <div className="mt-12 space-y-4">
        {user ? (
          <Button variant="solid-blue" className="p-3 w-full" onClick={handleSave}>
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
