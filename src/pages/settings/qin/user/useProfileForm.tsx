import "firebase/storage";

import firebase from "firebase/app";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";
import { useUser } from "src/contexts/user";

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
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const accountIdRef = useRef<HTMLInputElement>(null);
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
    if (!nameRef.current?.value || !accountIdRef.current?.value || !user) {
      return;
    }
    if (selectedFile) {
      await firebase.storage().ref(user.id).put(selectedFile);
    }
    const idToken = await authUser.getIdToken();
    const body = {
      name: nameRef.current.value,
      accountId: accountIdRef.current?.value,
      avatarUrl: createAvatarUrl(user.id),
    };
    const res = await fetch(`${API_URL}/users/${user.id}`, {
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
    nameRef,
    imageRef,
    accountIdRef,
    handleChangeFile,
    handleSave,
    handleOpenFileDialog,
  };
};
