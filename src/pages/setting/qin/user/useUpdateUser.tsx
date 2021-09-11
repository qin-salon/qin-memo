import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import type { UserType } from "src/api/handler/user/type";
import type { UserUpdateForm } from "src/pages/setting/qin/user/ProfileForm";
import { useUser } from "src/util/user";

const createAvatarUrl = (userId: string) => {
  const filePath = encodeURIComponent(`thumbnails/${userId}_200x200`);
  return `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}/${filePath}?alt=media`;
};

/**
 * @package
 */
export const useUpdateUser = (selectedFile?: File) => {
  const authUser = useAuthUser();
  const { user, setUser } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = useCallback(
    async (formData: UserUpdateForm) => {
      if (!user) {
        return;
      }
      if (selectedFile) {
        const storage = getStorage();
        await uploadBytes(ref(storage, user.id), selectedFile);
      }
      const idToken = await authUser.getIdToken();
      const res = await fetch(`${API_URL}/users/${user.userName}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${idToken}`, "content-type": "application/json" },
        body: JSON.stringify({ ...formData, avatarUrl: selectedFile ? createAvatarUrl(user.id) : undefined }),
      });
      const json: UserType = await res.json();
      return json;
    },
    [authUser, selectedFile, user]
  );

  const updateUser = useCallback(
    async (formData: UserUpdateForm) => {
      setIsUpdating(true);
      await toast.promise(onSubmit(formData), {
        loading: "処理中",
        success: (data) => {
          setUser(data);
          return "保存しました";
        },
        error: "失敗しました",
      });
      setIsUpdating(false);
    },
    [onSubmit, setUser]
  );

  return { isUpdating, updateUser };
};
