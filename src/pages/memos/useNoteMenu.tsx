import { ClipboardCopyIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { NoteType } from "src/api/handler/note/type";
import type { MenuDialogListProps } from "src/component/Dialog";
import { TwitterIcon } from "src/component/Icon";

type UseNoteMenuProps = {
  public?: NoteType["public"];
  onCloseMenu: () => void;
  togglePublicStatus: () => Promise<any>;
  deleteNote: () => Promise<any>;
};

/**
 * @package
 */
export const useNoteMenu = (props: UseNoteMenuProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsShowDeleteDialog(false);
  }, []);

  const handleClickPublic = useCallback(async () => {
    setIsLoading(true);
    try {
      await toast.promise(props.togglePublicStatus(), {
        loading: "処理中",
        success: props?.public ? "非公開にしました" : "公開しました",
        error: "失敗しました",
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [props]);

  const handleClickDelete = useCallback(() => {
    setIsShowDeleteDialog(true);
    props.onCloseMenu();
  }, [props]);

  const handleClickTwitterShare = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?url=${location.href}&text=${"メモを書きました"}&via=${"QinMemo"}`;
    window.open(url, "_blank", "noreferrer");
  }, []);

  const handleClickCopy = useCallback(async () => {
    await navigator.clipboard.writeText(location.href);
    toast("コピーしました");
    props.onCloseMenu();
  }, [props]);

  const handleDeleteNote = useCallback(async () => {
    try {
      await toast.promise(props.deleteNote(), {
        loading: "処理中",
        success: "削除しました",
        error: "失敗しました",
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [props, router]);

  const menu = useMemo<MenuDialogListProps["menu"]>(() => {
    return [
      [
        {
          label: props?.public ? "非公開にする" : "公開する",
          labelColor: "blue",
          icon: props?.public ? <EyeOffIcon /> : <EyeIcon />,
          iconColor: "blue",
          onClick: handleClickPublic,
          disabled: isLoading,
        },
        {
          label: "削除する",
          labelColor: "red",
          icon: <TrashIcon />,
          iconColor: "red",
          onClick: handleClickDelete,
          disabled: isLoading,
        },
      ],
      props?.public ? "メモをシェアしよう" : "以下は公開後に操作できます",
      [
        {
          label: "Twitterでシェアする",
          icon: <TwitterIcon />,
          iconColor: "twitter",
          onClick: handleClickTwitterShare,
          disabled: !props?.public,
          disabledColor: !props?.public,
        },
        {
          label: "リンクをコピーする",
          icon: <ClipboardCopyIcon />,
          onClick: handleClickCopy,
          disabled: !props?.public,
          disabledColor: !props?.public,
        },
      ],
    ];
  }, [handleClickCopy, handleClickDelete, handleClickPublic, handleClickTwitterShare, isLoading, props?.public]);

  return { isShowDeleteDialog, menu, handleDeleteNote, handleCloseDeleteDialog };
};
