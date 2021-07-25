import { ClipboardCopyIcon, DotsCircleHorizontalIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { NoteMenuProps } from "src/components/NoteMenu";
import { Button } from "src/components/shared/Buttons";
import { TwitterIcon } from "src/components/shared/Icons";
import type { NoteType } from "src/types/types";
import { API_URL } from "src/utils/constants";

const useNoteMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleOpenMenu = useCallback(() => {
    setIsShowMenu(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsShowMenu(false);
  }, []);
  return { isShowMenu, handleOpenMenu, handleCloseMenu };
};

const useDeleteNoteDialog = (note: NoteType) => {
  const router = useRouter();
  const authUser = useAuthUser();
  const [isShowDeleteNoteDialog, setIsShowDeleteNoteDialog] = useState(false);
  const handleOpenDeleteNoteDialog = useCallback(() => {
    setIsShowDeleteNoteDialog(true);
  }, []);
  const handleCloseDeleteNoteDialog = useCallback(() => {
    setIsShowDeleteNoteDialog(false);
  }, []);
  const handleDeleteMemo = useCallback(async () => {
    try {
      const idToken = await authUser.getIdToken();
      await fetch(`${API_URL}/v1/notes/${note.id}`, {
        method: "delete",
        headers: { authorization: `Bearer ${idToken}` },
      });
      await router.push("/");
      toast.success("削除しました");
    } catch (error) {
      console.error(error);
    }
  }, [authUser, note.id, router]);
  return { isShowDeleteNoteDialog, handleOpenDeleteNoteDialog, handleCloseDeleteNoteDialog, handleDeleteMemo };
};

export const useNote = (note: NoteType) => {
  const authUser = useAuthUser();
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteMenu();
  const { isShowDeleteNoteDialog, handleOpenDeleteNoteDialog, handleCloseDeleteNoteDialog, handleDeleteMemo } =
    useDeleteNoteDialog(note);
  const [isPublic, setIsPublic] = useState(note.public);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePublicState = useCallback(async () => {
    setIsLoading(true);
    try {
      const idToken = await authUser.getIdToken();
      const promise = fetch(`${API_URL}/v1/notes/${note.id}/public`, {
        method: "patch",
        headers: { authorization: `Bearer ${idToken}` },
      });
      await toast.promise(promise, {
        loading: "処理中",
        success: () => {
          setIsPublic(!isPublic);
          return isPublic ? "非公開にしました" : "公開にしました";
        },
        error: "失敗しました",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [authUser, isPublic, note.id]);

  // ヘッダーの右メニュー部分
  const headerRight = useMemo(() => {
    return [
      isPublic ? (
        <span key="public" className="py-1 px-2.5 text-xs font-bold text-white bg-orange-400 rounded-full">
          公開中
        </span>
      ) : undefined,
      <Button key="menu" variant="ghost" className="w-10 h-10" onClick={handleOpenMenu}>
        <DotsCircleHorizontalIcon className="w-5 h-5" />
      </Button>,
    ];
  }, [handleOpenMenu, isPublic]);

  // ダイアログ内のメニュー部分
  const menu = useMemo<NoteMenuProps["menu"]>(() => {
    return [
      [
        {
          label: isPublic ? "非公開にする" : "公開する",
          labelColor: "blue",
          icon: isPublic ? <EyeOffIcon /> : <EyeIcon />,
          iconColor: "blue",
          onClick: handleTogglePublicState,
          disabled: isLoading,
        },
        {
          label: "削除する",
          labelColor: "red",
          icon: <TrashIcon />,
          iconColor: "red",
          onClick: () => {
            handleOpenDeleteNoteDialog();
            handleCloseMenu();
          },
          disabled: isLoading,
        },
      ],
      isPublic ? "メモをシェアしよう" : "以下は公開後に操作できます",
      [
        {
          label: "Twitterでシェアする",
          icon: <TwitterIcon />,
          iconColor: "twitter",
          onClick: () => {
            // TODO
            const url = `https://twitter.com/intent/tweet?url=${
              location.href
            }&text=${"メモを書きました"}&via=${"QinMemo"}`;
            window.open(url, "_blank", "noreferrer");
          },
          disabled: !isPublic || isLoading,
        },
        {
          label: "リンクをコピーする",
          icon: <ClipboardCopyIcon />,
          onClick: async () => {
            await navigator.clipboard.writeText(location.href);
            toast("コピーしました");
            handleCloseMenu();
          },
          disabled: !isPublic || isLoading,
        },
      ],
    ];
  }, [handleCloseMenu, handleOpenDeleteNoteDialog, handleTogglePublicState, isLoading, isPublic]);

  return {
    headerRight,
    menu,
    // menu
    isShowMenu,
    handleCloseMenu,
    // delete dialog
    handleDeleteMemo,
    isShowDeleteNoteDialog,
    handleCloseDeleteNoteDialog,
  };
};
