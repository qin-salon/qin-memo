import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { API_URL } from "src/api/endpoint";
import type { NoteType } from "src/api/handler/note/type";
import { Button } from "src/component/Button";
import { ConfirmDialog, MenuDialog, MenuDialogList } from "src/component/Dialog";
import { Layout } from "src/layout";
import useSWRImmutable from "swr/immutable";

import { PublicLabel } from "./PublicLabel";
import { Textarea } from "./Textarea";
import { useDeleteNote } from "./useDeleteNote";
import { useDialog } from "./useDialog";
import { useNoteMenu } from "./useNoteMenu";

/**
 * @package
 */
export const NoteEditor: VFC<{ note: NoteType }> = (props) => {
  const { data } = useSWRImmutable<NoteType>(`${API_URL}/notes/${props.note.id}`);
  const note = data ?? props.note;
  const { isShowMenuDialog, isShowConfirmDialog, dispatch } = useDialog();
  const { menu } = useNoteMenu(note, dispatch);
  const { handleDeleteNote } = useDeleteNote(note);

  const handleShowMenuDialog = () => {
    dispatch({ type: "SHOW_MENU_DIALOG" });
  };
  const handleHideMenuDialog = () => {
    dispatch({ type: "HIDE_MENU_DIALOG" });
  };
  const handleHideConfirmDialog = () => {
    dispatch({ type: "HIDE_CONFIRM_DIALOG" });
  };

  return (
    <>
      <Layout
        left="memo"
        right={[
          note.isPublic ? <PublicLabel /> : undefined,
          <Button key="menu" variant="ghost" className="w-10 h-10" onClick={handleShowMenuDialog}>
            <DotsCircleHorizontalIcon className="w-5 h-5" />
          </Button>,
        ]}
      >
        <Textarea note={note} />
      </Layout>

      <MenuDialog show={isShowMenuDialog} onClose={handleHideMenuDialog}>
        <MenuDialogList menu={menu} />
      </MenuDialog>

      <ConfirmDialog
        show={isShowConfirmDialog}
        onClose={handleHideConfirmDialog}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </>
  );
};
