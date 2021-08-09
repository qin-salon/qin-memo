import "firebase/storage";

import firebase from "firebase/app";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";
import { useUser } from "src/context/user";

const createAvatarUrl = (userId: string) => {
  const filePath = encodeURIComponent(`thumbnails/${userId}_200x200`);
  return `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}/${filePath}?alt=media`;
};

/**
 * @package
 */
export const useProfileForm = () => {
  const authUser = useAuthUser();
  const { user, setUser } = useUser();
  const accountNameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleOpenFileDialog = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.item(0);
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }, []);

  const handleChangeUser = useCallback(async () => {
    if (!accountNameRef.current?.value || !userNameRef.current?.value || !user) {
      return;
    }
    if (selectedFile) {
      await firebase.storage().ref(user.id).put(selectedFile);
    }
    const idToken = await authUser.getIdToken();
    const body = {
      userName: userNameRef.current?.value,
      accountName: accountNameRef.current.value,
      avatarUrl: selectedFile ? createAvatarUrl(user.id) : undefined,
    };
    const res = await fetch(`${API_URL}/users/${user.userName}`, {
      method: "PUT",
      headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const json: UserType = await res.json();
    return json;
  }, [authUser, selectedFile, user]);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    await toast.promise(handleChangeUser(), {
      loading: "処理中",
      success: (data) => {
        setUser(data);
        return "保存しました";
      },
      error: "失敗しました",
    });
    setIsLoading(false);
  }, [handleChangeUser, setUser]);

  return {
    isLoading,
    imageUrl,
    accountNameRef,
    imageRef,
    userNameRef,
    handleChangeFile,
    handleSave,
    handleOpenFileDialog,
  };
};
