import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import { API_URL } from "src/api/endpoint";
import { useUser } from "src/util/user";

/**
 * @package
 */
export const useDeleteDialog = () => {
  const authUser = useAuthUser();
  const { user } = useUser();

  // memo
  const [isShowDeleteQinMemo, setIsShowDeleteQinMemo] = useState(false);
  const handleOpenDeleteQinMemoDialog = useCallback(() => {
    setIsShowDeleteQinMemo(true);
  }, []);
  const handleCloseDeleteQinMemoDialog = useCallback(() => {
    setIsShowDeleteQinMemo(false);
  }, []);
  const handleDeleteQinMemo = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/users/${user?.id}/service`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await authUser.signOut();
  }, [authUser, user?.id]);

  // account
  const [isShowDeleteQinAccount, setIsShowDeleteQinAccount] = useState(false);
  const handleOpenDeleteQinAccountDialog = useCallback(() => {
    setIsShowDeleteQinAccount(true);
  }, []);
  const handleCloseDeleteQinAccountDialog = useCallback(() => {
    setIsShowDeleteQinAccount(false);
  }, []);
  const handleDeleteQinAccount = useCallback(async () => {
    const idToken = await authUser.getIdToken();
    await fetch(`${API_URL}/users/${user?.id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${idToken}` },
    });
    await authUser.signOut();
  }, [authUser, user?.id]);

  return {
    isShowDeleteQinMemo,
    handleDeleteQinMemo,
    handleOpenDeleteQinMemoDialog,
    handleCloseDeleteQinMemoDialog,
    isShowDeleteQinAccount,
    handleDeleteQinAccount,
    handleOpenDeleteQinAccountDialog,
    handleCloseDeleteQinAccountDialog,
  };
};
