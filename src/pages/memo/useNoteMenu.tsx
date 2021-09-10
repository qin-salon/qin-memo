import { ClipboardCopyIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import type { Dispatch } from "react";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import type { NoteType } from "src/api/handler/note/type";
import type { MenuDialogListProps } from "src/component/Dialog";
import { TwitterIcon } from "src/component/Icon";
import { useTogglePublicStatus } from "src/pages/memo/useTogglePublicStatus";

import type { DialogActionType } from "./useDialog";

const shareOnShare = () => {
  const url = `https://twitter.com/intent/tweet?url=${location.href}&text=${"メモを書きました"}&via=${"QinMemo"}`;
  window.open(url, "_blank", "noreferrer");
};

const copyHref = async () => {
  await navigator.clipboard.writeText(location.href);
  toast("コピーしました");
};

/**
 * @package
 */
export const useNoteMenu = (note: NoteType, dispatch: Dispatch<DialogActionType>) => {
  const { isLoading, handleTogglePublic } = useTogglePublicStatus(note);

  const handleShareOnTwitter = useCallback(() => {
    shareOnShare();
    dispatch({ type: "HIDE_MENU_DIALOG" });
  }, [dispatch]);

  const handleCopyHref = useCallback(async () => {
    await copyHref();
    dispatch({ type: "HIDE_MENU_DIALOG" });
  }, [dispatch]);

  const handleShowConfirmDialog = useCallback(async () => {
    dispatch({ type: "SHOW_CONFIRM_DIALOG" });
  }, [dispatch]);

  const menu = useMemo<MenuDialogListProps["menu"]>(() => {
    return [
      [
        {
          label: note.isPublic ? "非公開にする" : "公開する",
          labelColor: "blue",
          icon: note.isPublic ? <EyeOffIcon /> : <EyeIcon />,
          iconColor: "blue",
          onClick: handleTogglePublic,
          disabled: isLoading,
        },
        {
          label: "削除する",
          labelColor: "red",
          icon: <TrashIcon />,
          iconColor: "red",
          onClick: handleShowConfirmDialog,
          disabled: isLoading,
        },
      ],
      note.isPublic ? "メモをシェアしよう" : "以下は公開後に操作できます",
      [
        {
          label: "Twitterでシェアする",
          icon: <TwitterIcon />,
          iconColor: "twitter",
          onClick: handleShareOnTwitter,
          disabled: !note.isPublic,
          disabledColor: !note.isPublic,
        },
        {
          label: "リンクをコピーする",
          icon: <ClipboardCopyIcon />,
          onClick: handleCopyHref,
          disabled: !note.isPublic,
          disabledColor: !note.isPublic,
        },
      ],
    ];
  }, [handleCopyHref, handleShareOnTwitter, handleShowConfirmDialog, handleTogglePublic, isLoading, note.isPublic]);

  return { menu };
};
