import { ClipboardCopyIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { MenuDialogListProps } from "src/components/Dialogs";
import { ConfirmDialog, MenuDialog, MenuDialogList } from "src/components/Dialogs";
import { TwitterIcon } from "src/components/shared/Icons";
import type { NoteType } from "src/types/types";

type NoteActionProps = {
  public?: NoteType["public"];
  isShowMenu: boolean;
  onCloseMenu: () => void;
  togglePublicStatus: () => Promise<any>;
  deleteNote: () => Promise<any>;
};

export const NoteAction: VFC<NoteActionProps> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsShowDeleteDialog(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsShowDeleteDialog(false);
  }, []);

  const handleClickPublicBtn = useCallback(async () => {
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
          onClick: handleClickPublicBtn,
          disabled: isLoading,
        },
        {
          label: "削除する",
          labelColor: "red",
          icon: <TrashIcon />,
          iconColor: "red",
          onClick: () => {
            handleOpenDeleteDialog();
            props.onCloseMenu();
          },
          disabled: isLoading,
        },
      ],
      props?.public ? "メモをシェアしよう" : "以下は公開後に操作できます",
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
          disabled: !props?.public,
          disabledColor: !props?.public,
        },
        {
          label: "リンクをコピーする",
          icon: <ClipboardCopyIcon />,
          onClick: async () => {
            await navigator.clipboard.writeText(location.href);
            toast("コピーしました");
            props.onCloseMenu();
          },
          disabled: !props?.public,
          disabledColor: !props?.public,
        },
      ],
    ];
  }, [props, handleClickPublicBtn, isLoading, handleOpenDeleteDialog]);

  return (
    <div>
      <MenuDialog show={props.isShowMenu} onClose={props.onCloseMenu}>
        <MenuDialogList menu={menu} />
      </MenuDialog>

      <ConfirmDialog
        show={isShowDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </div>
  );
};
